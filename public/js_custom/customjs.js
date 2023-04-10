$("document").ready((readyevt)=>{

const targetEndPoint = "/api/customer/loans/status/{{customer_account}}";

/* client call for total-requests made to the loan-status endpoint */
$("#getTotal").click((evt)=>{ /* start-function-block */
                                            evt.preventDefault();
                                            const xhrObject = new XMLHttpRequest();
                                            xhrObject.open("GET", "/api/customer/loans/manage/requests/total", true);
                                            xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                                            xhrObject.send();
                                            xhrObject.onload = function(data){

                                                    if(xhrObject.status == 200)  {
                                                        const res = JSON.parse(xhrObject.response);
                                                        let totalReqs = parseInt(res.count);

                                                        $("#mainContentHeader").html(`Method:getTotalEndpointCalls() - Response/Payload`);
                                                        $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>${targetEndPoint}</span>Requests-served (total):<span class='reqs'>${totalReqs.toString().padStart(4,'0')}</span>`); 
                                                        $("#data_").val(`${xhrObject.response}`);

                                                    };

                                                    if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                                                    if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                                                    if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                                                };
    }); /* end-function-block */


 /* client call for failed/invalidated requests to the loan-status endpoint */
 $("#getInvalid").click((evt)=>{ /* start-function-block */
                                    evt.preventDefault();
                                    const xhrObject = new XMLHttpRequest();
                                    xhrObject.open("GET", "/api/customer/loans/manage/request/invalid", true);
                                    xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                                    xhrObject.send();
                                    xhrObject.onload = function(data){

                                            if(xhrObject.status == 200)  {
                                                const res = JSON.parse(xhrObject.response);
                                                let totalReqs = parseInt(res.count);
                                                $("#mainContentHeader").html(`Method:getInvalidEndpointcalls() - Response/Payload`);
                                                $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>${targetEndPoint}</span>Requests-served (total):<span class='reqs'>${totalReqs.toString().padStart(4,'0')}</span>`);
                                                $("#data_").val(`${xhrObject.response}`);
                                            };

                                            if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                                            if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                                            if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                                        };
    }); /* end-function-block */


    /* client call for requests that return atleast one loan-status */
 $("#getPositive").click((evt)=>{ /* start-function-block */
                                        evt.preventDefault();
                                        const xhrObject = new XMLHttpRequest();
                                        xhrObject.open("GET", "/api/customer/loans/manage/requests/loanReturning", true);
                                        xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                                        xhrObject.send();
                                        xhrObject.onload = function(data){

                                                if(xhrObject.status == 200)  {
                                                    const res = JSON.parse(xhrObject.response);
                                                    let totalReqs = parseInt(res.count);

                                                    $("#mainContentHeader").html(`Method:getPositiveRequests() - Response/Payload`);
                                                    $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>${targetEndPoint}</span>Requests-served (total):<span class='reqs'>${totalReqs.toString().padStart(4,'0')}</span>`);
                                                    $("#data_").val(`${xhrObject.response}`);
                                                };

                                                if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                                                if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                                                if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                                            };     
 }); /* end-function-block */


  /* client call for requests that return no loan-status */
  $("#getNegative").click((evt)=>{ /* start-function-block */
                                            evt.preventDefault();
                                            const xhrObject = new XMLHttpRequest();
                                            xhrObject.open("GET", "/api/customer/loans/manage/requests/NonloanReturning", true);
                                            xhrObject.setRequestHeader("x-auth-token", sessionStorage.getItem("x-auth-token"));
                                            xhrObject.send();
                                            xhrObject.onload = function(data){
                                                    if(xhrObject.status == 200)  {
                                                        const res = JSON.parse(xhrObject.response);
                                                        let totalReqs = parseInt(res.count);

                                                        $("#mainContentHeader").html(`Method:getNegativeRequests() - Response/Payload`);
                                                        $("#summaryCanvas").html(`Resource-url:<span class ='rsx'>${targetEndPoint}</span>Requests-served (total):<span class='reqs'>${totalReqs.toString().padStart(4,'0')}</span>`);
                                                        $("#data_").val(`${xhrObject.response}`);
                                                    };

                                                    if(xhrObject.status == 400) return $("#data_").val(xhrObject.response);
                                                    if(xhrObject.status == 401) return $("#data_").val(xhrObject.response);
                                                    if(xhrObject.status == 403) return $("#data_").val(xhrObject.response);
                                                };
  }); /* end-function-block */

  $("#logoutOfSession").click((exitSessevt)=>{
     exitSessevt.preventDefault();
     sessionStorage.clear();
     location.assign("/login.html");
  });

});/* end-block */