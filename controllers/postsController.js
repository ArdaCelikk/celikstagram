const Posts = require("../models").posts


const likePost =async (req,res)=>{
    try {
        const {postID}= req.body
        let post  = await Posts.findOne({where: {id: postID}})
        let likes = JSON.parse(post.likes)
        if(post.likes){
            
            if(likes.includes(res.locals.user.id)){
                let takeIndex = likes.indexOf(res.locals.user.id)
                if(takeIndex !== -1){
                    likes.splice(takeIndex, 1)
                    let extractUser = await Posts.update(
                        {likes: JSON.stringify(likes)},
                        {where: {id:postID }}
                    )
                    if(extractUser){
                        res.status(200).json({
                            succeded: true,
                            like: false
                        })
                    }
                }
            }else if(!likes.includes(res.locals.user.id)){
                likes.push(res.locals.user.id)
                let addLike = await Posts.update(
                    {likes: JSON.stringify(likes)},
                    {where:{id: postID}}
                )
                if(addLike){
                    res.status(200).json({
                        succeded:true,
                        like: true
                    })
                }
            }else{
                res.status(500).json({
                    succeded:false,
                    msg: "Something Going Wrong!!"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            msg: error.message
        })
    }
}



module.exports = {
    likePost
}