const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const db=async()=>{
    try {
        await mongoose.connect(process.env.MongoUrl)
        .then(()=>{console.log('====================================');
        console.log("data base connected");
        console.log('====================================');})
        // res.status(200).message("dbconnected")
    } catch (error) {
        console.log("database is failed");
        
    }
}
module.exports=db