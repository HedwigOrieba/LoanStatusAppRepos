 const {User, validateUser} = require('../models/user');
 const express = require('express'); 
 const debug = require('debug')('dfcu:startup');
 const auth_mw  = require('../middleware/auth_mw');

 const _ = require('lodash');
 const bcrypt = require('bcrypt');

 const userrouter = express.Router();

 /* route to register a user */
 userrouter.post('/register', auth_mw, async(req,res,next)=>{

    try {
            const result = validateUser(req.body);

            if(result.error) return res.status(400).send(result.error.details[0].message);

            /* Check if the user is already registered */
            let user = await User.findOne({email:req.body.email});
            if(user) return res.status(400).send('User is already registered');

            user = new User(_.pick(req.body,['name','email','password','isAdmin']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);

            await user.save();

            const token = user.generatejwToken();
            res.header('x-auth-token',token).status(200).send(_.pick(user,['name','email']));
                                    
            /*debug(user);*/

    } catch (error) {
        next(error);
        debug( `Error: ${error.message}`);
    }

 });

 module.exports = userrouter;