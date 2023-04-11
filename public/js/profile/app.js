const fileInput = document.getElementById('file-uploadphoto');
const imgUploaded = document.getElementById("imgUploaded")
let main = document.querySelector(".main")

var clickCount = 0

// FOTOĞRAF PAYLAŞMAK
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    main.children[0].style.display = "none"
    main.children[1].style.display = "none"
    main.children[2].style.display = "none"
    let textArea = document.createElement("textarea")
    textArea.placeholder = "Açıklama Yaz..."
    main.appendChild(textArea)

    let submit = document.createElement("input")
    submit.type = "submit"
    submit.value = "Paylaş"
    main.appendChild(submit)
    const loadingRing = document.getElementById("loadingRing")
    if(clickCount === 0)
    {
        ++clickCount
        submit.addEventListener("click", async ()=>{
            textArea.style.display = "none"
            submit.style.display = "none"
            loadingRing.style.display = "inline-block"
            let pleaseWaitText = document.createElement("div")
            pleaseWaitText.textContent = "Lütfen Bekleyiniz"
            pleaseWaitText.className = "pleaseWaitText"
            main.appendChild(pleaseWaitText)
            formData.append('description', textArea.value);
            const request = await fetch('/profile/uploadphoto', {
                method: 'POST',
                body: formData
            })
            const response = await request.json();
        
            if(response.succeded){
                setTimeout(() => {
                    window.location.href = "/profile" 
                }, 200);
            }
          })
    }
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
let profilePhotoBox = document.getElementById("profilePhotoBox")
let loadingRing2 = document.getElementById("loadingRing2")
profilephoto.addEventListener("change", async ()=>{
    profilePhotoBox.children[0].style.display = "none"
    profilePhotoBox.children[1].style.display = "none"
    profilePhotoBox.style.display= "flex"
    profilePhotoBox.style.justifyContent= "center"
    profilePhotoBox.style.alignItems= "center"
    profilePhotoBox.style.background= "transparent"
    loadingRing2.style.display = "inline-block"
    const profilephotoFile = profilephoto.files[0];
    const formData2 = new FormData();
    formData2.append('profile_photo', profilephotoFile);
    let request = await fetch('/profile/changeprofilephoto', {
        method: 'POST',
        body: formData2
    })
    let response = await request.json()
    if(response.succeded){
        
        setTimeout(() => {
            window.location.href = "/profile" 
        }, 200);
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