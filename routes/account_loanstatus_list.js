const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {Customer, AccNumber}  = require('../models/customer_account_list');
const {Loan,validatePayload } = require('../models/loan_list');
const debug = require('debug')('dfcu:startup');
const auth_mw  = require('../middleware/auth_mw');
const admin_mw = require('../middleware/admin_mw');
const requestlogger  = require('../middleware/reqlogger_mw');
const {APIREQUEST} = require('../models/requestlogger');



/* bizz-logic:: loan status of customer account */

function validator(account){
    const schema = Joi.object({
        accNumber: Joi.string().length(10).pattern(/^\d+$/).messages({'string.length':'Account number must be 10-digits long.'}).required()
    });
    return schema.validate(account);
}


/* Route to return customer loan status - */

//201 negative request: nothing was found in the loans repository to return.
//200 postive request: something was found.
//40X invalid requests. They failed validation.

//client must present valid authentication to consume resource.
//auth_mw
router.get('/status/:accNumber',[requestlogger], async(req, res,next)=>{
    
 
    try {
            /* algo step: 10-digit joi-validation for account nos. */
            const result = validator(req.params);
            if(result.error) return res.status(400).send(result.error.details[0].message);

            /* algo step: Account existance verification */
            const accountLoans =  await AccNumber.find({'accNo': req.params.accNumber});

            if(accountLoans.length === 0) return res.status(400).send("Invalid account number provided.");
            
            /* algo step: if account exists - get the customer associated to the account*/
            const AccountOwner = await Customer.find({'_AccountNumber':req.params.accNumber});
            
            /* algo step: use the customer-id to get the loan status of the customer.*/
            const CustomerLoanStatus  =  await Loan.find({'__custId':AccountOwner[0]._customer_id});

            if(CustomerLoanStatus.length === 0) return res.status(201).send("no loan found");

            return res.status(200).send(CustomerLoanStatus);
          

    } catch (error) {
             next(error); 
             debug( `Error: ${error.message}`);
    }
   
});



/* Admin-only route to view requests that return a result with a loan */
router.get('/manage/requests/loanReturning', [auth_mw, admin_mw], async (req,res, next)=>{
    try {
         
            const results = await APIREQUEST.find({__responseCode:"200"});

            if(!results) return res.status(200).send({msg:"NO RESULTS FOUND.",count:0});

            const counter = await APIREQUEST.find({__responseCode:"200"}).count();
            return res.status(200).send({requestList:results,count:counter});

        } catch (error) {
            next(error); 
            debug( `Error: ${error.message}`);  
        }
 });


// /* Admin-only route to view requests that return a result without a loan */
 router.get('/manage/requests/NonloanReturning', [auth_mw, admin_mw], async (req,res, next)=>{ 
    try {
            
            const results = await APIREQUEST.find({__responseCode:"201"});

            if(!results) return res.status(200).send({msg:"NO RESULTS FOUND.",count:0});

            const counter = await APIREQUEST.find({__responseCode:"201"}).count();
            return res.status(200).send({requestList:results,count:counter});

        } catch (error) {
            next(error); 
            debug( `Error: ${error.message}`);  
        }
 });


/* Admin-only route to view total requests to the end-point /status/:accNumber*/
router.get('/manage/requests/total', [auth_mw, admin_mw], async (req,res, next)=>{ 
    
    try {

            const results = await APIREQUEST.find();

            if(!results) return res.status(200).send({msg:"NO RESULTS FOUND.",count:0});

            const counter = await APIREQUEST.find().count();
            return res.status(200).send({requestList:results,count:counter});

    } catch (error) {
        next(error); 
        debug( `Error: ${error.message}`); 
    }
});

/* Admin-only route to view total list of failed validations */
router.get('/manage/request/invalid', [auth_mw, admin_mw], async (req,res, next)=>{ 
    try {
            
            const results = await APIREQUEST.find({__responseCode:{$ne:200}});

            if(!results) return res.status(200).send({msg:"NO RESULTS FOUND.",count:0});

            const counter = await APIREQUEST.find({__responseCode:{$ne:200}}).count();
            return res.status(200).send({requestList:results,count:counter});

    } catch (error) {
        next(error); 
        debug( `Error: ${error.message}`);  
    }
});





module.exports = router;