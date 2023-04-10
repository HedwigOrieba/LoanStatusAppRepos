const debug = require('debug')('dfcu:startup');

module.exports = function(req,res,next){
    //debug(req.user); 
    if(!req.user.isAdmin) return res.status(403).send('Access Denied!');
    next();
}