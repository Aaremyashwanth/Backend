const express=require('express')
const registercontroller=require('../Controller/Register')
const router=express.Router()
router.post('/signup',registercontroller.registercontroller)
router.post('/signin',registercontroller.userlogin)
router.get('/getall',registercontroller.getAllregister)
router.get('/y/:a',registercontroller.singlerecord)
module.exports=router

