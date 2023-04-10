const winston =  require('winston');
require('winston-mongodb');
const config = require('config');
const debug = require('debug')('dfcu:startup');

/* handle errors that occur at the core-process level. */
module.exports = function(){

                        winston.add(new winston.transports.File({filename:'./api_logs/logfile.log'}));
                        winston.add(new winston.transports.MongoDB({db:config.get('loggingdbConstr'), options:{useUnifiedTopology: true,useNewUrlParser: true}}));

                        process.on('uncaughtException',(err)=>{
                                        debug(err.message);
                                        debug("FATAL ERROR: UNCAUGHT EXCEPTION IN APP-PROCESS");
                                        winston.error(err.message,err);
                                });

                        process.on('unhandledRejection',(error)=>{
                                        debug("FATAL ERROR: UNHANDLED ASYNC-EXCEPTION IN APP-PROCESS");
                                        winston.error(error.message,error);
                                        debug(err.message);
                                });
}