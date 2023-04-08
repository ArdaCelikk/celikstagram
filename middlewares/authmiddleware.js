const jwt = require("jsonwebtoken")
const User = require("../models").users

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findOne({where:{id:decodedToken.id}});
        res.locals.user = {
          id:user.id,
          profile_photo: user.profile_photo,
          username: user.username,
          fullname: user.fullname,
          followers: JSON.parse(user.followers),
          following: JSON.parse(user.following)
        };
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          console.log(err.message);
          res.redirect('/accounts/login');
        } else {
          next();
        }
      });
    } else {
      res.redirect('/accounts/login');
    }
  } catch (error) {
    res.status(401).json({
      succeeded: false,
      error: 'Not authorized',
    });
  }
};

const reverseAuthenticateToken = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
    
        if (token) {
          jwt.verify(token, process.env.JWT_SECRET, (err) => {
            if (err) {
              console.log(err.message);
              next()
            } else {
              res.redirect("/")
            }
          });
        } else {
          next()
        }
      } catch (error) {
        next()
      }
}

module.exports= { authenticateToken, checkUser , reverseAuthenticateToken };