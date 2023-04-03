
const pageController = require("../controllers/pageController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/").get(authMiddleware.authenticateToken,authMiddleware.checkUser,pageController.getIndexPage)

module.exports =  router