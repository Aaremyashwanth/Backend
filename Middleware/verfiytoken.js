const Register=require('../Model/Register')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const secretkey=process.env.MyName

const verifytoken=async (req,res,next) => {
    const token=req.headers.token;
    if(!token){
        return res.status(400).json({message:"Token is required",token})
    }
    try {
        const decode=jwt.verify(token,secretkey)
    const register=await Register.findById(decode.LoginID) 
    if(!register){
        return res.status(400).json({ error: "vendor not found"})
    }
    req.LoginID=register._id
    next()
    } 
        catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Invalid token" });
        }
    }
    
    

module.exports=verifytoken