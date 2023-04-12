const profileController = require("../controllers/profileController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/").get(authMiddleware.authenticateToken, profileController.getProfilePage)
router.route("/uploadphoto").post( authMiddleware.authenticateToken, profileController.uploadPosts)
router.route("/changeprofilephoto").post(authMiddleware.authenticateToken, profileController.changeProfilePhoto)
router.route("/posts").get(authMiddleware.authenticateToken,profileController.showOwnPosts)
router.route("/follow").post(authMiddleware.authenticateToken,profileController.followUser)
router.route("/:username").get(authMiddleware.authenticateToken,profileController.getOtherUserProfile)

module.exports = router