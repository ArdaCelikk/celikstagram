const multer = require("multer")
const Posts = require("../models").posts
const User = require("../models").users




const getProfilePage = async (req,res)=>{
    const posts = await Posts.findAll({where:{user_id: res.locals.user.id}}) 
    if(posts)
    {
      res.render("profile",{
        link:"profile",
        posts,
        
      })
    }else{
      res.render("profile",{
        link:"profile",
        posts:false
      })
    }
    
}

const uploadPosts = async  (req,res)=>{
    try {
          // Dosya yükleme ayarları
        const storage = await  multer.diskStorage({
          destination: function (req, file, cb) {
            if(file){
              cb(null, 'public/uploads/')
            }
          },
          filename: function (req, file, cb) {
            if(file){
              cb(null, Date.now() + '-' + file.originalname)
            }
          }
        });

        const upload = await multer({ storage: storage });

        await upload.single('file') (req, res, async (err)  => {
        // Yükleme işlemi tamamlandıktan sonra burada yapılacak işlemler
        if(req.file.path){
          let newPath = await req.file.path.split('\\').splice(1, 3)
          let sharePost = await  Posts.create({
            user_id: res.locals.user.id,
            username: res.locals.user.username,
            profile_photo: res.locals.user.profile_photo,
            url: "/"+newPath.join("/"),
            description: req.body.description,
          })
        }
        })

        res.status(200).json({
          succeded:true
        })
      
      
    } catch (error) {
      res.status(500).json({
        succeded:false,
        msg: error.message
      })
    }
}

const changeProfilePhoto = async (req,res)=>{
  try {
    const storage = await multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
      }
    });
    const upload = await multer({ storage: storage });
    await upload.single('profile_photo') (req, res, async (err)  => {

      if(err) console.log(err);
      // Yükleme işlemi tamamlandıktan sonra burada yapılacak işlemler
      const newPath = await req.file.path.split('\\').splice(1, 3).join("/");
      const changePhoto = await User.update(
        {profile_photo: "/"+newPath},
        {where:{id: res.locals.user.id}}
      )
    })

    res.status(200).json({
      succeded:true
    })
      
  } catch (error) {
    res.status(500).json({
      succeded:false,
      msg: error.message
    })
  }
}

const showOwnPosts = async (req,res)=>{
  try {
    let posts = await Posts.findAll({where:{user: res.locals.user.id}})
    if(posts){
      res.render("ownposts",{
        link: "profile",
        posts
      })
    }
  } catch (error) {
    res.status(500).json({
      succeded: false,
      msg: error.message
    })
  }
}


const getOtherUserProfile = async (req,res)=>{
  try {
    const paramsUser =await  User.findOne({where:{username:req.params.username}})
    if(req.params.username == res.locals.user.username){
      res.redirect("/profile")
    }else if(paramsUser){
      if(paramsUser){
        const posts = await Posts.findAll(
        {
            include: [{
              model: User,
            }],
            where:{user_id: paramsUser.id}
        })
        

        // res.send(posts[0].user)
        if(posts){
          res.render("profiles",{
            posts,
            paramsUser,
            link:"index"
          })
        }else{
          res.render("profiles",{
            posts:false,
            paramsUser,
            link: "index"
          })
        }
      }else{
        res.redirect("/")
      }
    }else if(!paramsUser){
      res.redirect("/")
    }
    
  } catch (error) {
    res.status(500).json({
      succeded:false,
      msg: error.message
    })
  }
}

const followUser = async (req,res)=>{
  try {
    const followingUser = await User.findOne({where:{id:req.body.user_ID}})
    if(followingUser){
      const followers = await JSON.parse(followingUser.followers)
      if(followers.includes(res.locals.user.id)){
        const index  = followers.indexOf(res.locals.user.id)
        if (index !== -1) { // eğer eleman dizide bulunursa
          followers.splice(index, 1); // diziden elemanı siler
        }
        const unFollow = await User.update(
          {followers: JSON.stringify(followers)},
          {where:{id:req.body.user_ID}}
        )

        if(unFollow){
          if(res.locals.user.following.includes(req.body.user_ID)){
            const following = res.locals.user.following
            const index  = following.indexOf(req.body.user_ID)
            if (index !== -1) { // eğer eleman dizide bulunursa
              following.splice(index, 1); // diziden elemanı siler
            }
            const deleteFollowing = await User.update(
              {following:JSON.stringify(following)},
              {where:{id:res.locals.user.id}}
            )
            if(deleteFollowing){
              res.status(200).json({
                succeded:true,
                followed:false
              })
            }
          }
        }

      }else if(!followers.includes(res.locals.user.id)){
        followers.push(res.locals.user.id)
        const addFollow = await User.update(
          {followers: JSON.stringify(followers)},
          {where:{id:req.body.user_ID}}
          )

        if(addFollow){
          if(res.locals.user){
            if(res.locals.user.following.includes(req.body.user_ID)){

            }else{
              const following = res.locals.user.following
              following.push(req.body.user_ID)
              const addFollowing = await User.update(
                {following: JSON.stringify(following)},
                {where:{id:res.locals.user.id}}
              )

              if(addFollowing){
                res.status(200).json({
                  succeded:true,
                  followed:true
                })
              }
            }
          }
        }
      }

    }else{
      res.status(500).json({
        succeded:false,
        msg:"User Not Found!!"
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      succeded:false,
      msg: error.message
    })
  }

}

module.exports = {
    getProfilePage,
    uploadPosts,
    changeProfilePhoto,
    showOwnPosts,
    getOtherUserProfile,
    followUser
}