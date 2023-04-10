const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const middlewares= require("./middlewares/authmiddleware")
// const userRoute = require("./routes/userRoute")
const pageRoute = require("./routes/pageRoutes")
const profileRoute = require("./routes/profileRoutes")
const accountsRoute = require("./routes/accountsRoutes")
const postsRoute = require("./routes/postsRoute")
const app = express()


dotenv.config()
const port = process.env.PORT

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());

// ROUTES
// app.use("/users",userRoute)
app.use("*",middlewares.checkUser)
app.use("/",pageRoute)
app.use("/profile",profileRoute)
app.use("/accounts",accountsRoute)
app.use("/posts",postsRoute)

app.listen(port,()=>{
    console.log("Server Started On This Port: "+ port);
})







