
let txtEmail= document.getElementById("txtEmail")
let txtPassword= document.getElementById("txtPassword")
let lblFormAlert = document.getElementById("lblFormAlert")
let form = document.querySelector("form")
form.addEventListener("submit",()=>{
    try {
        fetch("/accounts/login", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:txtEmail.value,
                password:txtPassword.value
            }),
        })
        .then(res=>res.json())
        .then(value=>{
            console.log(value);
            if(!value.succeded){
                lblFormAlert.textContent = value.message;
                lblFormAlert.style.color= "#ee092d"
            }else{
                lblFormAlert.textContent = value.message;
                lblFormAlert.style.color= "green"
                
            }
        })
    } catch (error) {
        console.log(error.message);
    }
})