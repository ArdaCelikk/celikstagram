const multer = require("multer")
const Posts = require("../models").posts
const User = require("../models").users




const getProfilePage = async (req,res)=>{
  try {
    let posts = await Posts.findAll({where:{user: res.locals.user.id}}) 
    res.render("profile",{
    link:"profile",
    posts,
  })
  } catch (error) {
    res.status(400).json({
      message: "no post"
    })
  }
}

const uploadPosts = async  (req,res)=>{
    try {
      // Dosya yükleme ayarları
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname)
        }
      });

      const upload = multer({ storage: storage });

      upload.single('file') (req, res, async (err)  => {
      // Yükleme işlemi tamamlandıktan sonra burada yapılacak işlemler
      let newPath =  req.file.path.split('\\').splice(1, 3)
      let sharePost = await  Posts.create({
        user: res.locals.user.id,
        username: res.locals.user.username,
        profile_photo: res.locals.user.profile_photo,
        url: "/"+newPath.join("/"),
        description: req.body.description,
      })
      });
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
      
  } catch (error) {
    res.status(500).json({
      succeded:false,
      msg: error.message
    })
  }
}

module.exports = {
    getProfilePage,
    uploadPosts,
    changeProfilePhoto
}