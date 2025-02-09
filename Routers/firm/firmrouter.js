const express = require('express');
const verify = require('../../Middleware/verfiytoken'); // Corrected spelling
const firmController = require('../../Controller/Firmcontroller'); // Corrected spelling and casing
const router = express.Router();

router.post('/add-firm', verify, firmController.Firmcontroller); // Corrected spelling
router.get('/:ImageName',(req,res)=>{
    const ImageName=req.params.ImageName
    res.headersSent('Content-type','upload/Image'),
    res.sendDate(Path.join(__dirname,'..','uploads',ImageName))
})
router.delete('/deletefirm/:deletefirmid',firmController.DeleteFirm)
module.exports = router;
