const mongoose=require('mongoose')
const Firm=require('./Firm')


const Productschema=new mongoose.Schema({
    ProductName:{
        type:String,
        require:true
    },
    Category:{
        type:[
            {
                type:String,
                enum:["Veg","Non_veg"]
            }
        ]
    },
    Bestseller:{
        type:String
    },
    Price:{
        type:String
    },
    Discription:{
        type:String
    },
    Image:{
        type:String
    },
    firm:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]
})
const Product=mongoose.model('Product',Productschema)
module.exports=Product