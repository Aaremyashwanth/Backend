const Firmmodel=require('../Model/Firm')
const userlogin=require('../Model/Register')
const multer=require('multer')
const path=require('path')

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})


const upload=multer({stroage:storage});
const Firmcontroller=async(req,res)=>{
    try {
     const {FirmName,Category,Address,Offer,Region}=req.body
     const Image=req.file?req.file.filename:undefined   
     const Register=await userlogin.findById(req.LoginID)
        if(!Register){
            return res.status(400).json({message:"regiser id not get"})
        }
        
        const newfirm=new Firmmodel({
            FirmName,
            Category,
            Address,
            Offer,
            Region,
            Image,
            register:Register._id
        })
        
        const savefirmdb=await newfirm.save()
        
        Register.firm.push(savefirmdb)
        await Register.save()
        res.status(200).json({message:"firm is added"})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"firm is not added"})
        
    }
}

const DeleteFirm=async (req,res) => {
    const firmid=req.params.deletefirmid
    try {
        const deletefirm=await Firm.findByIdAndDelete(firmid)
        if(deletefirm){
            return res.status(200).json({message:"firm is deleted"})
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({message:"Delete firmcontroller"})
    }
}
module.exports={Firmcontroller:[upload.single('image'),Firmcontroller],DeleteFirm}