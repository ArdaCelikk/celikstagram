const postsController = require("../controllers/postsController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/like").post( authMiddleware.authenticateToken,postsController.likePost)


module.exports =  router