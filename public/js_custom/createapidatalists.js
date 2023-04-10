
$("document").ready((readyevt)=>{
    /* create a user in the api-datasource */
    $("#createUser").click((evt)=>{
                evt.preventDefault();
                const xhrObject = new XMLHttpRequest();
                xhrObject.open("POST","/api/users/register", true); 
                xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                xhrObject.setRequestHeader("Content-Type", "application/json");
                xhrObject.setRequestHeader("Accept","application/json");
                xhrObject.setRequestHeader("Accept","text/plain");

                const _data = $("#data_").val();
                if (_data.length == 0) return self.alert('Invalid Operation: Attempt to post without data.');
                xhrObject.send(_data);
                xhrObject.onload = function(data){
                        if(xhrObject.status == 200)  {
                            const res = JSON.parse(xhrObject.response);
                            $("#mainContentHeader").html(`Method:createUser() - Response/Payload`);
                            $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>/api/users/register</span>:<span class='reqs'>SUCCESS</span>`);
                            $("#data_").val(`${xhrObject.response}`);
                            persistPrincipleIdentity(xhrObject);
                        };

                        if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                        if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                        if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);

                    };
    });

    
    /*create a customer & a respective unique account in api datasource*/
    $("#createCustAcc").click((evt)=>{
                    evt.preventDefault();
                    const xhrObject = new XMLHttpRequest();
                    xhrObject.open("GET", "/api/data/customer/accounts/lists/create", true); 
                    xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                    xhrObject.send();
                    xhrObject.onload = function(data){
                            if(xhrObject.status == 200)  {
                                const res = JSON.parse(xhrObject.response);
                                let totalReqs = parseInt(res.count);
                                $("#mainContentHeader").html(`Method:createCustomerandAccount() - Response/Payload`);
                                $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>/api/data/customer/accounts/lists/create</span>:<span class='reqs'>SUCCESS</span>`);
                                $("#data_").val(`${xhrObject.response}`);
                            };
                            if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                            if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                            if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                        };
    });


    
    /* create a loan-status for a customer in the api-datasource */
    $("#createLoanStatus").click((evt)=>{
                evt.preventDefault();
                const xhrObject = new XMLHttpRequest();
                xhrObject.open("POST", "/api/data/loans/create", true); 
                xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                xhrObject.setRequestHeader("Content-Type", "application/json");
                xhrObject.setRequestHeader("Accept","application/json");
                xhrObject.setRequestHeader("Accept","text/plain");
     
                const _data = $("#data_").val();
                if (_data.length == 0) return self.alert('Invalid Operation: --Attempt to post without data.');
                
                xhrObject.send(_data);
                xhrObject.onload = function(data){
                        if(xhrObject.status == 200)  {
                            const res = JSON.parse(xhrObject.response);
                            $("#mainContentHeader").html(`Method:createCustomerandAccount() - Response/Payload`);
                            $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>/api/data/loans/create</span>:<span class='reqs'>SUCCESS</span>`);
                            $("#data_").val(`${xhrObject.response}`);
                        };

                        if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                        if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                        if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                    };
    });


});/* */