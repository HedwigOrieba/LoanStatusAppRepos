const { APIREQUEST } = require('../models/requestlogger');
const debug = require('debug')('dfcu:startup');

module.exports =function (req,res,next){ /* start middleware function */

    try {
            res.on('finish',async ()=>{
                const _request = new APIREQUEST({
                                                    __requestSrc:req.hostname,
                                                    __requestType:req.method,
                                                    __responseCode:res.statusCode,
                                                    __requestUrl:req.originalUrl
                                                    
                                               });
                const _loggedreq =  await _request.save();
                // debug(_loggedreq);
                //debug(res);
            });

            next();

    }catch (error) {
            next(error);
            debug(error);
    }
}/* end function */