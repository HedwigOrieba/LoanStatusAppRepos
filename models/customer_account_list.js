const mongoose = require('mongoose');
    /* Customer model */
    const Customer = mongoose.model('Customer', new mongoose.Schema({
        _customer_id: {
                        type: String,
                        required:[true,'Customer Id value is required.'],
                        validate:{
                                    validator: function(v){
                                                            return /[A-Z0-9]{7,7}/.test(v);
                                                          },
                                    message:`Invalid Customer Id value provided.`
                                 }
                    },
    
        _AccountNumber: {
                            type: String,
                            required:[true,'Customer account number is required.'],
                            validate:{
                                        validator: function(v){
                                                                return /[0-9]{10,10}/.test(v);
                                                              },
                                        message:`Invalid Account-number format.`
                                    }
                        }
    }));

   /* Account Model */
    const AccNumber = mongoose.model("Account",new mongoose.Schema({
        accNo:{
                type:String,
                required:[true,'Account-number is required.'],
                validate:{
                            validator: function(v){
                                                    return /[0-9]{10,10}/.test(v);
                                                  },
                            message:`Invalid Account-number value provided.`
                        }
        },
    }));

module.exports.Customer = Customer;
module.exports.AccNumber = AccNumber;