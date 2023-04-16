const Posts = require("../models").posts
const User = require("../models").users

const getIndexPage =async (req,res)=>{
    const posts = await Posts.findAll({
        include: [{
          model: User,
        }],
        order: Posts.sequelize.literal('RAND()')
      })

    res.render("index",{
        link:"index",
        posts
    })
}



module.exports = {getIndexPage}