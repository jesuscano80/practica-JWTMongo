const {Router}= require ("express");
const router=Router();
const User = require ("./models/user")
const jwt = require("jsonwebtoken");
const config = require("./config");
router.get("/", (req,res)=>{
    res.json({
        "Bienvenido al api":"hola"    })
})

router.post("/aunthenticate", async(req,res)=>{
    const user = await User.findOne({
         name:req.body.name
     })
 if (!user){
  return    res.json({success:true, message:"No encontrado"})
 }
 
 if (user.password != req.body.password){
   return  res.json({success:false, message:"contrseña erronea"})
 }
 try{
 const token = jwt.sign({user}, config.secret);
 
 res.json({succes:true, message: "disfruta tu token", token});
 }
 catch(err){
    return res.status(400).json({sucess:false, message: err})
 }
 })
 
 
router.use(async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (token){
    try{
        const decoded = await jwt.verify(token,config.secret)
    
   req.decoded= decoded;
    next();
    }
    catch(err){
        res.status(401).json({message:"token not valid", err})
    }
}
    else{
        res.json({message:"no hay token"});
    }
})

router.get("/users", async (req,res)=>{
     const users = await User.find();

     res.json({users})
})



module.exports=router;