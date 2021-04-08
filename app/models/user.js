const {Schema, model} = require ("mongoose");

const Userschema = new Schema ({
    name:String,
    password:String,
    admin:Boolean

})

module.exports= model("User", Userschema)