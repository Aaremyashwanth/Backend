const mongoose= require('mongoose')

const RegisterSchema=new mongoose.Schema({
    FullName:{type:String,require:true},
    Password:{type:String,require:true},
    Email:{type:String,require:true,unique:true},
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
})

const Register=mongoose.model('Register',RegisterSchema)
module.exports=Register