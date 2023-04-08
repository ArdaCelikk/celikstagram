const Posts = require("../models").posts

const getIndexPage =async (req,res)=>{
    const posts = await Posts.findAll()
    // console.log(posts);
    res.render("index",{
        link:"index",
        posts
    })
}



module.exports = {getIndexPage}