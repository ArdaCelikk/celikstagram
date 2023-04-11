const User = require("../models").users
const Reset = require("../models").resetpassword
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")




function generateRandomNumber() {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }




let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nissanskylinegtr34rb26280hp@gmail.com',
      pass: 'ldtmvbxkgctkghoo'
    }
  });







const registerUser = async (req,res)=>{
    try {
        const {username,email,password,fullname} = req.body
        let checkUsername = await User.findOne({where:{username:req.body.username}})
        if(checkUsername){
            res.status(409).json({
                succeded:false,
                message: "Bu Kullanıcı Adı Kullanılmakta Lütfen Başka Bir Kullanıcı Adı Seçiniz."
            })
        }else if(!checkUsername){
            let checkEmail = await User.findOne({where:{email}})
            if(checkEmail){
                res.status(409).json({
                    succeded:false,
                    message: "Bu Email Adresi Kullanılmakta Lütfen Başka Bir Email Adresi Giriniz."
                })
            }
            else if(!checkEmail){
                let hashedPassword = await bcrypt.hash(password,10)
                if(hashedPassword){
                    let createUser = await User.create({
                        email,
                        fullname,
                        username,
                        password:hashedPassword,
                        profile_photo:"/img/user.png",
                        mail_confirm:false,
                    })
                    if(createUser){
                        return res.status(200).json({
                            succeded:true,
                            message:"Hesabınız Oluşturulmuştur."
                        })
                        res.redirect("/accounts/login")
                    }
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body
        let checkEmail = await User.findOne({where:{email:email}})
        if(!checkEmail){
            res.status(409).json({
                succeded:false,
                message: "Kullanıcı Adı Veya Şifre Hatalı!"
            })
        }else if(checkEmail){
            let comparePassword = await bcrypt.compare(password,checkEmail.password)
            if(comparePassword){
                const token = await jwt.sign({id: checkEmail.id},process.env.JWT_SECRET,{expiresIn:"1d"})
                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24,
                });
                res.status(200).json({
                    succeded:true,
                    message: "Giriş Başarılı! Yönlendiriliyorsunuz..."
                })
            }else{
                res.status(409).json({
                    succeded:false,
                    message: "Kullanıcı Adı Veya Şifre Hatalı!"
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            msg: error.message
        })
    }
}

const getLoginPage = (req,res)=>{
    res.render("login")
}

const getRegisterPage = (req,res)=>{
    res.render("register")
}

const getResetPasswordPage = (req,res)=>{
    res.render("resetpassword")
}




const resetPasswordSendCode = async (req,res)=>{
    try {
        let check = await User.findOne({where:{email: req.body.email}})
        let code = generateRandomNumber()
        let checkEmail = await Reset.findOne({where:{email: req.body.email}})
        if(checkEmail){
            Reset.destroy({where:{email:req.body.email}})
        }
        let checkCode = await Reset.findOne({where:{code:code}})
        if(checkCode){
            code = generateRandomNumber()
        }
        if(check.username){
            let bilgiler = {
                from: "nissanskylinegtr34rb26280hp@gmail.com",
                to: req.body.email,
                subject: "Celikstagram | Şifremi Unuttum",
                text: "Kodunuz : " + code 
            }
            await Reset.create({email:req.body.email,code})
            res.status(200).json({
                succeded:true,
                message: "Bu Mail Sitemize Kayıtlı İse Mailiniz Gönderilmiştir. Gelen Kutunuzu Kontrol Ediniz."
            })
            transporter.sendMail(bilgiler, function (error, info){console.log('Eposta gönderildi ' + info.response)})
        }
    } catch (error) {
        res.status(500).json({
            succeded:false,
            error: error.message
        })
    }
}


module.exports = {
    getLoginPage,
    getRegisterPage,
    registerUser,
    loginUser,
    getResetPasswordPage,
    resetPasswordSendCode
}