const multer = require("multer")
const Posts = require("../models").posts




const getProfilePage = (req,res)=>{
    res.render("profile",{
        link:"profile"
    })
}

const uploadPhoto = async  (req,res)=>{
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

module.exports = {
    getProfilePage,
    uploadPhoto
}