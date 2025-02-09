const express=require('express')
const connectDB=require('./DatabaseConnection')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const signup=require('./Routers/Router')
const firmrouter=require('./Routers/firm/firmrouter')
const productrouter=require('./Routers/product/productrouter')
const bodyParser = require('body-parser')

dotenv.config()

const app=express()
const port=5000
app.use(bodyParser.json())

// mongoose.connect(process.env.MongoUrl).then(()=>{
//   console.log("DB CONNECTED");
  
// }).catch(()=>{console.log("DB FAIL");
// }
// )
connectDB()
app.use('/home',(req,res)=>{
    res.send("hello home")
})
  app.use('/register',signup)
  app.use('/firm',firmrouter)
  app.use('/product',productrouter)

  

app.listen(port,()=>{
    console.log("port is connected");
    
})
