const fileInput = document.getElementById('file-uploadphoto');
const imgUploaded = document.getElementById("imgUploaded")
let main = document.querySelector(".main")

// FOTOĞRAF PAYLAŞMAK
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    main.innerHTML = ""
    let textArea = document.createElement("textarea")
    textArea.placeholder = "Açıklama Yaz..."
    main.appendChild(textArea)

    let submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Paylaş"
    main.appendChild(submit)
    submit.addEventListener("click", async ()=>{
    formData.append('description', textArea.value);
    const request = await fetch('/profile/uploadphoto', {
        method: 'POST',
        body: formData
    })
    const response = await request.json();
    console.log(response);

    if(response.succeded){
        window.location.href = "/profile"
    }
  })
});


let sharePostCloser = document.getElementById("sharePostCloser")
let uploadPhotoContainer = document.querySelector(".uploadPhotoContainer")
let btnSharePhoto = document.querySelector(".btnSharePhoto")


sharePostCloser.addEventListener("click",()=>{
    window.location.href = "/profile"
})

btnSharePhoto.addEventListener("click",()=>{
    uploadPhotoContainer.style.display = "flex"
})




let profilephoto = document.getElementById("file-profilephoto")

profilephoto.addEventListener("change", async ()=>{
    const profilephotoFile = profilephoto.files[0];
    const formData2 = new FormData();
    formData2.append('profile_photo', profilephotoFile);
    let request = await fetch('/profile/changeprofilephoto', {
        method: 'POST',
        body: formData2
    })
    let response = await request.json()
    if(response.succeded){
        console.log(response);
        window.location.href = "/profile"
    }
    

})


let profilePhoto = document.querySelector(".profilePhoto")
let ppChange_container = document.querySelector(".ppChange-container")
let changeProfileCloser = document.getElementById("changeProfileCloser")
profilePhoto.addEventListener("click",()=>{
    ppChange_container.style.display = "flex"
})

changeProfileCloser.addEventListener("click",()=>{
    ppChange_container.style.display = "none"
})