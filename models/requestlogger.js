const mongoose = require('mongoose');

const APIREQUEST = mongoose.model('apiRequest', new mongoose.Schema(
                                    {
                                        __requestDate:{
                                                        type: Date, 
                                                        default:Date.now
                                                    },
                                        __requestSrc:String,
                                        __requestType:String,
                                        __responseCode:String,
                                        __requestUrl:String
                                    }
                            ));

module.exports.APIREQUEST = APIREQUEST;