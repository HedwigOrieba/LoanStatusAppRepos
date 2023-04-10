const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const express = require('express'); 
const debug = require('debug')('dfcu:startup');
const Joi = require('joi');
const { string } = require('joi');

const authenticationRouter = express.Router();

/* route to login a user  */
authenticationRouter.post('/login',async(req, res,next)=>{
    try{
            const result = validateUser(req.body);
            if(result.error) return res.status(400).send(result.error.details[0].message);
        
            let user = await User.findOne({email:req.body.email});
            if(!user) return res.status(400).send('Invalid email or password');
        
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) return res.status(400).send('Invalid email or password');
            
            /* user is authentic to access app-resources --award user a token */
            const sessionToken = user.generatejwToken();
            if (user.isAdmin) return res.header('x-auth-token',sessionToken).status(200).send("Admin");
            if (!user.isAdmin) return res.header('x-auth-token',sessionToken).status(200).send("Common");

    }catch(error){
            next(error);
            debug( `Error: ${error.message}`);
    }
    
});

function validateUser(user){
    const reqSchema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    });

    return reqSchema.validate(user); 
}

module.exports = authenticationRouter 

