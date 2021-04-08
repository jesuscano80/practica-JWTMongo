const express=require ("express");
const app=express();
const morgan = (require("morgan"));
const mongoose = require ("mongoose");
const config = require("./config");
const User = require("./models/user")
//setting

//database
mongoose.connect(config.databse, { useUnifiedTopology: true , useNewUrlParser: true } )
.then((db)=> console.log("connected to DB"))
.catch((err)=> console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"));
const apiRouter = require("./api");
const port = process.env.PORT || 3000;
app.use("/api",apiRouter);
app.set("supersecret",config.secret);
//middlewares


//routes
app.get("/",(req,res)=>{
    res.send("hello, La API is at ")
})

app.get("/setup", async (req,res)=>{
    const testUser = new User({
        name:"hola",
        password:"prueba",
        admin:true
    })

   const userSaved=await testUser.save();
   res.json({userSaved})
    
})
app.listen(3000, ()=>{
    console.log("listen 3000");
})