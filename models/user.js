 
 const mongoose = require('mongoose');
 const Joi = require('joi');
 const jwt = require('jsonwebtoken');
 const config = require('config');

 /* User schema */
 const userSchema =new mongoose.Schema({
   name: {
            type:String,
            minlength:5,
            maxlength:50,
            required: true
         },
   email:{
           type:String,
           minlength:5,
           maxlength:255,
           required: true,
           unique:true 
         },
   password:{
            type: String,
            minlength:5,
            maxlength:1024,
            required:true,
            unique:true 
         },
         
     isAdmin:Boolean
});

/* add  jwt issuing method to the user-model -- instance method */
userSchema.methods.generatejwToken = function(){
   return jwt.sign({_id:this._id,isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
 }

 /* User model: Data/Integration tier model. */
 const User = mongoose.model("User",userSchema);

 /* Presentation-tier http request validator */ 
 function validateUser(user){
    const userSchema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean()
    });

    return userSchema.validate(user)
 }

 module.exports.User = User;
 module.exports.validateUser = validateUser;