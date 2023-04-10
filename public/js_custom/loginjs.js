
$(document).ready((readyevt)=>{

    const email = document.querySelector("#email");
    const password = document.querySelector("#passkey");

    /* Start client side email validation-logic */
    email.oninvalid = function(invalidEvt){ 
        invalidEvt.preventDefault();
        if(invalidEvt.target.value.length === 0) return self.alert("Email value is required!");
        if(invalidEvt.target.value.length < 5) return self.alert('Email must be atleast five(5) characters long.');
        if(invalidEvt.target.value.length > 255) return self.alert('Email must be less than 255 characters long.');
        let _regX =new RegExp(`[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+[.]{1}[a-zA-Z0-9]+`);
        if(!_regX.test(invalidEvt.target.value)) return self.alert(`Invalid format or charset in email.`);
    } /* end  logic */

    /* start client side password validation-logic -- okay*/
    password.oninvalid = function(passInvalidEvt){
        passInvalidEvt.preventDefault()
        if(passInvalidEvt.target.value.length === 0) self.alert("Password value is required!");
        if(passInvalidEvt.target.value.length < 5) return self.alert('Password must be atleast five(5) characters long.');
        if(passInvalidEvt.target.value.length > 255) return self.alert('Password must be less than 255 characters long.');
        let reg_expr = new RegExp(`^${passInvalidEvt.target.getAttribute('pattern')}$`);
        if(!reg_expr.test(passInvalidEvt.target.value)) return self.alert(`Invalid format or charset in password.`);
    }/* end logic */

    /*clear the sessionStorage */
    sessionStorage.clear();

    $('#loginFrm').on('submit', (evt)=>{
        
        evt.preventDefault();
        // some json & ajax work here .....okayy
        const formObj = {
                            email:$('#email').val(),
                            password:$('#passkey').val()
                        };

        const postJsonData = JSON.stringify(formObj);
        
        const xhrObj = new XMLHttpRequest();
        xhrObj.open('POST', $("#loginFrm").attr('action'),true);
        xhrObj.setRequestHeader("Content-Type","application/json");
        xhrObj.setRequestHeader("Accept","application/json");
        xhrObj.setRequestHeader('Accept',"text/plain");
        xhrObj.send(postJsonData);
        
        xhrObj.onload = function(data){

                        if(xhrObj.status === 200 ){
                            sessionStorage.setItem("x-auth-token", xhrObj.getResponseHeader('x-auth-token'));

                            if (xhrObj.responseText == "Admin"){
                                location.href = "/adminapi.html";
                            }else{
                                location.href = "/common.html";
                            }

                            $('#email').val(""),
                            $('#passkey').val("")
                        }

                        if(xhrObj.status === 400 ){
                            self.alert(xhrObj.responseText);
                            $('#email').val(""),
                            $('#passkey').val("")
                        }
                 };
    });

});
   