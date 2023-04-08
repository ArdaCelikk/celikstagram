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
        const response = await fetch('/profile/uploadphoto', {
          method: 'POST',
          body: formData
        })
        let data = await response.json()
        if(data){
            window.location.reload()
            window.location.href= "/profile"
        }
  })
});


let sharePostCloser = document.getElementById("sharePostCloser")
let uploadPhotoContainer = document.querySelector(".uploadPhotoContainer")
let btnSharePhoto = document.querySelector(".btnSharePhoto")


sharePostCloser.addEventListener("click",()=>{
    window.location.reload()
})

btnSharePhoto.addEventListener("click",()=>{
    uploadPhotoContainer.style.display = "flex"
})





