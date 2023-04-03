let form = document.querySelector("form")
let txtEmail = document.getElementById("txtEmail")
let txtFullname= document.getElementById("txtFullname")
let txtUsername= document.getElementById("txtUsername")
let txtPassword= document.getElementById("txtPassword")
let lblAlert = document.getElementById("lblAlert")
form.addEventListener("submit",async ()=>{
    try {
        fetch("/accounts/register", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:txtEmail.value,
                fullname:txtFullname.value,
                username: txtUsername.value,
                password:txtPassword.value
            }),
            })
            .then(response=>response.json())
            .then(value=>{
                if(!value.succeded)
                {
                    lblAlert.style.color="#ee092d"
                    lblAlert.textContent = value.message
                }
                else if(value.succeded){
                    lblAlert.style.color="green"
                    lblAlert.textContent = value.message
                    setTimeout(() => {
                        window.location.href = "/accounts/login"
                    }, 500);
                }
            })
    } catch (error) {
        console.log(error.message);
    }
    
})