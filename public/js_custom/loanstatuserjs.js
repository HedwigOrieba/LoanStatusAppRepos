$("document").ready((docrevt)=>{ /* Start method call */
    
    $('#getLoanStatus').on('click',(evt)=>{
        evt.preventDefault();
        $("#responseCanvas").html("");
        $("#summaryCanvas").html("");
        let custAccount = self.prompt("Enter customer account:","0000000003");
        const xHRObject = new XMLHttpRequest();
        xHRObject.open('GET',`/api/customer/loans/status/${custAccount}`,true);
        xHRObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
        xHRObject.setRequestHeader("Accept","application/json");
        xHRObject.setRequestHeader("Accept","text/plain");
        xHRObject.send();
        xHRObject.onload = function(data){
                if(xHRObject.status === 200){
                    const res= JSON.parse(xHRObject.response);
                    $("#responseCanvas").append(`<div id='dataHead'>ACCOUNT: &nbsp;&nbsp;${custAccount}&nbsp;&nbsp;&nbsp;&nbsp;CUSTOMER ID: &nbsp;&nbsp;${res[0].__custId}</div>`);   
                    
                    for(x=0;x<res.length;x++){     
                        $("#responseCanvas").append(`<div class='payldRow'> Loan ID: ${res[x].__loanId} &nbsp;&nbsp;&nbsp; Disbursement Date: ${res[x].__disbursementDate} &nbsp;&nbsp;&nbsp; Outstanding Amount:${res[x].__outStandingAmount}</div>`);     
                     };
                    $("#summaryCanvas").html(`TOTAL :&nbsp;&nbsp<span class='reqs'>${res.length.toString().padStart(4,'0')}</span>`); 
                }

                if(xHRObject.status !== 200 ) {
                    $("#responseCanvas").html(`<div id='dataHead'>ACCOUNT: &nbsp;&nbsp;${custAccount}</div>`);
                    $("#summaryCanvas").html(`&nbsp;&nbsp<span class='reqs'>${xHRObject.responseText}</span>`);
                }

        }/* end onload event-cb */
    });


    $("#exitSession").click((exitSessevt)=>{
        exitSessevt.preventDefault();
        sessionStorage.clear();
        location.assign("/login.html");
     });
    
});/* End method call */