const express  = require ('express');
const debug = require('debug')('dfcu:startup');
const {Loan,validatePayload} = require('../models/loan_list');
const auth  = require('../middleware/auth_mw');

const loansRouter  = express.Router();

/** loan_id auto-generator **/
async function generateLoanId(){ 
    try {
            const loan = await Loan.find().sort({__loanId:-1}).limit(1) // for min

            if(loan.length === 0){
                return "L000001";
            }else{
                return 'L' + String((parseInt(loan[0].__loanId.substring(1, loan[0].__loanId.length)) + 1).toString()).padStart(6,'0');
            }

    } catch (error) {
        debug( `Error: ${error.message}`); 
    } 
}


/* loans list creation logic - {protected route} */
loansRouter.post('/create',auth, async (req,res,next)=>{
    try {
            debug(req.body);
            const result = validatePayload(req.body);

            if(result.error) return res.status(400).send(result.error.details[0].message);
    
            const loan_id = await generateLoanId();

            const loan  = new Loan({
                __custId:req.body.customer_id,
                __loanId:loan_id,
                __disbursementDate:req.body.disburseDate,
                __outStandingAmount:req.body.outStandingAmt
            });

            const loanResult = await loan.save();

            res.send(loanResult);

           /*debug(loanResult);*/
    } catch (error) {
        next(error);
        debug( `Error: ${error.message}`);
    }
});

module.exports = loansRouter; 