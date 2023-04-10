const postsController = require("../controllers/postsController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/like").post( postsController.likePost)


module.exports =  router