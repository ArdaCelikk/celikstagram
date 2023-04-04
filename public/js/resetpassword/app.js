
let formSendCode = document.getElementById("formSendCode")
let txtEmail = document.getElementById("txtEmail")
let lblAlert = document.getElementById("lblAlert")

try {
    formSendCode.addEventListener("submit",async ()=>{
        await fetch("/accounts/resetpassword", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:txtEmail.value
            }),
        }) 
        .then(res=>res.json())
        .then(value=>{
            if(value.succeded){
                lblAlert.style.color = "green";
                lblAlert.textContent = value.message
            }
        })
    })
       
} catch (error) {
    
}