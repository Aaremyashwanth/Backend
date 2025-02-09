const express=require('express')
const ProductController=require('../../Controller/ProductController')

const router=express.Router()
router.post('/addproduct/:searchfirm',ProductController.ProductController)
router.get('/:proid',ProductController.getsingleproduct)
router.get('/firmproduct/:fromfirm',ProductController.getproductsoffirm)
router.get('/:firmid/product',ProductController.getproductbyfirm)
router.get('/:ImageName',(req,res)=>{
    const ImageName=req.params.ImageName
    res.headersSent('Content-type','upload/Image'),
    res.sendDate(Path.join(__dirname,'..','uploads',ImageName))
})
router.delete('/deleteproduct/:deleteproid',ProductController.Deleteproduct)
module.exports=router