const accountsController = require("../controllers/accountsController")
const authmiddleware = require("../middlewares/authmiddleware")
const router = require("express").Router()

router.route("/login").get(authmiddleware.reverseAuthenticateToken,accountsController.getLoginPage)
router.route("/login").post(accountsController.loginUser)
router.route("/register").get(authmiddleware.reverseAuthenticateToken,accountsController.getRegisterPage)
router.route("/register").post(accountsController.registerUser)
router.route("/resetpassword").get(authmiddleware.reverseAuthenticateToken,accountsController.getResetPasswordPage)
router.route("/resetpassword").post(accountsController.resetPasswordSendCode)


module.exports =  router