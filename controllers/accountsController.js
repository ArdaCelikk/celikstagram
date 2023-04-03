const User = require("../models").users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
        res.status(500).json({error})
    }
}

const getLoginPage = (req,res)=>{
    res.render("login")
}

const getRegisterPage = (req,res)=>{
    res.render("register")
}



module.exports = {getLoginPage , getRegisterPage,registerUser ,loginUser}