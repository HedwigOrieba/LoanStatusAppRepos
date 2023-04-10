const mongoose = require('mongoose');
const Joi = require('joi');

const Loan = mongoose.model('Loan', new mongoose.Schema({
    __custId:{
                type:String,
                required:[true, 'Customer Id value is required'],
                validate:{
                            validator: function(v){
                                                    return /[A-Z0-9]{7,7}/.test(v);
                                                  },
                            message:`Invalid Customer Id value provided.`
                         }
            },
    __loanId:{
                type:String,
                required:[true, 'loan-Id value is required'],
                validate:{
                            validator: function(v){
                                                    return /[A-Z0-9]{7,7}/.test(v);
                                                  },
                            message:`Invalid Customer Id value provided.`
                         } 
            },
    __disbursementDate: Date,
    __outStandingAmount: Number
}));

function validateLoanStatusCheckRequest(StatusCheckReqObj){
    const schema = Joi.object({
                                    customer_id:Joi.string().pattern(new RegExp('^[A-Z0-9]{7,7}$')).required(),
                                    disburseDate:Joi.date().iso().less('now').required(),
                                    outStandingAmt:Joi.number().required()
                             });
    return schema.validate(StatusCheckReqObj);
}

module.exports.Loan = Loan;
module.exports.validatePayload = validateLoanStatusCheckRequest;