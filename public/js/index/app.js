
const likePost = async ()=>{
    let frontEndLikeCount = Number(this.parentElement.children[1].innerHTML)
    const res = await fetch("/posts/like", {
    method: "POST", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        postID:this.parentElement.lastElementChild.innerHTML
    }),
    })
    const response= await  res.json();
    if(response.succeded){
        
        if(response.like){
            this.parentElement.children[1].textContent = frontEndLikeCount+1;
            this.style.color = "crimson"
            
            console.log(frontEndLikeCount);
        }else{
            this.style.color = "white"
            this.parentElement.children[1].textContent = frontEndLikeCount-1
        }
    }
}


let like = document.getElementsByClassName("btnLike")
var j;
for(j=0; j< like.length;j++)
    {
        like[j].onclick = async function(){
            likePost()
        }
    }