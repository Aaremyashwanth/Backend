const Product=require('../Model/Product')
const multer=require('multer')
const Firm=require('../Model/Firm')
const Path=require('path')

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+Path.extname(file.originalname))
    }
})
const upload=multer({storage:storage})
const ProductController= async (req,res) => {
    const{ProductName,Category,Bestseller,Discription,Price,}=req.body
    const fetchfirmid= req.params.searchfirm
    try {
        const Firmid=await Firm.findById(fetchfirmid)
        
        const Image=req.file?req.file.filename:undefined
        const newproduct=new Product({
            ProductName,
            Category,
            Bestseller,
            Discription,
            Price,Image,
            firm:Firmid._id
        })
        //await newproduct.save()
         const saveproduct=await newproduct.save()
          Firmid.product.push(saveproduct)
          await Firmid.save()
        res.status(200).json({message:"product is add in DB"})
    } catch (error) {
        console.error(error);
        res.status(400).json({message:"product not add"})
    }
}

const getproductsoffirm=async(req,res)=>{
    const searchfirm=req.params.fromfirm
    try {
        const fetchfirmid=await Firm.findById(searchfirm).populate('product')
        if(!fetchfirmid){
            return res.status(400).json({message:"firm id not found"})
        }
        
        res.json({fetchfirmid})
        
    } catch (error) {
        console.error(error);
        
        res.status(400).json({message:"getproductsoffirm fail"})
    }
}

const getsingleproduct=async (req,res) => {
    const fetchproduct=req.params.proid
    try {
        const productid=await Product.findById(fetchproduct)
        if(!productid){
            return res.status(400).json({message:"product id fail"})
        }
        res.json({productid})
    } catch (error) {
        console.error(error)
        res.status(400).json({message:"getting single product fail"})
    }
}

const getproductbyfirm=async(req,res)=>{
    const firmid=req.params.firmid
try {
    const firminfo= await Firm.findById(firmid)
    const firmname=firminfo.FirmName
    const productinfo= await Product.find({firm:firmid})
    res.status(200).json({firmname,productinfo})
} catch (error) {
    console.error(error)
    res.status(400).json({message:"getproductbyfirm fail"})
}
}

const Deleteproduct=async (req,res) => {
    const productid=req.params.deleteproid
    try {
        const deletepro=await Product.findByIdAndDelete(productid)
        if(deletepro){
            return res.status(200).json({message:"product is deleted"})
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({message:"Deleteproduct"})
    }
}


module.exports={ProductController:[upload.single('Image'),ProductController],getsingleproduct,getproductsoffirm,getproductbyfirm,Deleteproduct}