/* verify the authenticity of the supplied token */
const jwt = require('jsonwebtoken');
const config = require('config');
const debug = require('debug')('dfcu:startup');

module.exports = function (req,res,next){

   /*read token from request */
   const token = req.header('x-auth-token');
   if(!token) return res.status(401).send('Access Denied. No token provided');
   try{
        /*decode token & add returned onject to the request object*/
        const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decodedPayload;
        next();
   }catch(ex){
         res.status(400).send("Invalid token provided.");
   }
}

