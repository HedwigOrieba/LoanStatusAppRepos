$("document").ready((readyevt)=>{

    /* json template to create/register a user. Admin can appropriately modify the tempate efore calling endpoint */
    $("#userRegJTemplate").click((evt)=>{
        const apiuser = {
                            name: "",
                            email:"",
                            password:"",
                            isAdmin:"true or false"
                        };
        const  userJson = JSON.stringify(apiuser);

        //send template to the text-area
        $("#data_").val(`${userJson}`);

    });

    /* template for creating a customer. */
    $("#custAccTemplate").click((evt)=>{
        $("#data_").val(`No JSON template required. Click associated commit() command to auto create a customer & respective account`);
    });  
    
    /* template for creating loan status for different customer accounts. */
    $("#loanRegJTemplate").click((evt)=>{
           const loanstatus = {
                                customer_id:"",
                                disburseDate:"2023-02-08T13:00:00+03:00",
                                outStandingAmt:"8000"
                              };

        const  customerloanJson = JSON.stringify(loanstatus);

        //send template to the text-area
        $("#data_").val(`${customerloanJson}`);
    });


});