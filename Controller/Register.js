const register=require('../Model/Register')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv')
dotenv.config()
const secretkey=process.env.MyName

const registercontroller=async(req,res)=>{
const {FullName,Password,Email}=req.body
try {
    const email=await register.findOne({Email})
    if(email){
        return res.status(200).json({message:'try another email'})
    }
    const hashpassword=await bcrypt.hash(Password,10)
    const serverbody=new register({
        FullName,
        Email,
        Password:hashpassword
})
    await serverbody.save()
    res.status(200).json({message:"entered data in db"})
} catch (error) {
    console.error(error);
    res.status(400).json({message:"error in register controller"})
}}
const userlogin=async(req,res)=>{
    const{Email,Password}=req.body
    try {
        const loginemail=await register.findOne({Email})
        if(!loginemail||! (await bcrypt.compare(Password,loginemail.Password))){
            return res.status(400).json({message:"login fail"})
        }
        const token=jwt.sign({LoginID:loginemail._id},secretkey,{expiresIn:'1hr'})
        
        res.status(200).json({success:"login  successfull",token})
    } catch (error) {
        res.status(400).json({message:"Login fail"})
    }
}

const getAllregister=async (req,res) => {
    try {
        const all= await register.find().populate('firm')
        res.json({all})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"not getting all register value"})
        
    }
}


const singlerecord=async(req,res)=>{
    try {
    const onerecord=req.params.a;
    const Registerid=await register.findById(onerecord);
    if (!Registerid) {
        return res.status(404).json({ error: "Register id not found" })}
    // const firmid=Register.firm[0]._id
    res.json({message:"ok",Registerid})
} catch (error) {
    console.error(error);
    res.status(500).json({message:"fail to fetch single record"})
    
}
}


module.exports={registercontroller,userlogin,getAllregister,singlerecord}