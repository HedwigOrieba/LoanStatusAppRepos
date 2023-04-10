const {Customer,AccNumber} = require('../models/customer_account_list');
const express  = require ('express');
const debug = require('debug')('dfcu:startup');
const mongoose = require('mongoose');
const authmw  = require('../middleware/auth_mw');

const customerAccountRouter = express.Router();



/*customer-id auto generator logic -- */
async function generateCustomerId(){ 
    try {
            const customer = await Customer.find().sort({_customer_id:-1}).limit(1) // for min
            if(customer.length === 0){
                return "C000001";
            }else{
                return 'C' + String((parseInt(customer[0]._customer_id.substring(1, customer[0]._customer_id.length)) + 1).toString()).padStart(6,'0');
            }
    } catch (error) {
        debug( `Error: ${error.message}`); 
    } 
}


async function createCustomer(__idVal, account){
    try {
            const customer = new Customer({
                                            _customer_id: __idVal,
                                            _AccountNumber:account
                                        });

            const createdCustomer = await customer.save();
            return createdCustomer;

    } catch (error) {
            debug( `Error: ${error.message}`);
    }
}


 /*  Account_no auto-generator  */
 async function generateAccountNos(){ 
    try {
            const _custAcc = await AccNumber.find().sort({accNo:-1}).limit(1) // for max

            if(_custAcc.length === 0){
                return "0000000001";
            }else{
                return String((parseInt(_custAcc[0].accNo.substring(1, _custAcc[0].accNo.length)) + 1).toString()).padStart(10,'0');
            }

    } catch (error) {
        debug( `Error: ${error.message}`); 
    } 
}

/* Create loan & respective customer - {protected route} */
customerAccountRouter.get('/lists/create',authmw, async (req,res,next)=>{

    try {
            const _autoAcc = await generateAccountNos();

            const account = new AccNumber({accNo:_autoAcc});

            /* create an account */
            const createdAccount = await account.save();

            const customer__id = await generateCustomerId();

            /* create a customer & associate him to an account no. */
            const customer = await createCustomer(customer__id, _autoAcc);

            res.send(customer);

            /*debug(customer);*/
    } catch (error) {
            next(error);
            debug( `Error: ${error.message}`);
    }
});

module.exports = customerAccountRouter;