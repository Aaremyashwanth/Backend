const mongoose=require("mongoose")
const Product = require("./Product")
const Firmschema=new mongoose.Schema({
    FirmName:{
        type:String,
        require:true
    },
    Address:{
        type:String,
        require:true
    },
    category:{
        type:[{type:String,
            enum:['VEG','NON_VEG']

        }]
    },
    region:{
        type:[{
            type:String,
            enum:['South-indian','North-indian','Chinese','Bakery']
        }]
    },
    Image:{
        type:String
    },
    Offer:{
        type:String
    },
    register:[{type:mongoose.Schema.Types.ObjectId,
        ref:'Register'
    }],
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Product
    }]
})
const Firmmodel=mongoose.model('Firm',Firmschema)
module.exports=Firmmodel