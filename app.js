const ser=require("express")
const app=ser()
const path=require("path")
const productRoutes=require("./routes/productRoutes.js")
require("dotenv-safe").config()
app.use(ser.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"templates"))
app.use(productRoutes);

app.listen(process.env.PORT,(err)=>{
    if(err) throw err
    console.log("success")
})