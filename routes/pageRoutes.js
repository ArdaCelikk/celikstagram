
const pageController = require("../controllers/pageController")
const authMiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/").get(authMiddleware.authenticateToken,pageController.getIndexPage)
router.route("/profile").get(authMiddleware.authenticateToken,pageController.getProfilePage)

module.exports =  router