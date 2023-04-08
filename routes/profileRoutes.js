const profileController = require("../controllers/profileController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/").get(authMiddleware.authenticateToken, profileController.getProfilePage)
router.route("/uploadphoto").post( profileController.uploadPosts)
router.route("/changeprofilephoto").post( profileController.changeProfilePhoto)

module.exports = router