const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const middlewares= require("./middlewares/authmiddleware")
// const userRoute = require("./routes/userRoute")
const pageRoute = require("./routes/pageRoutes")
const accountsRoute = require("./routes/accountsRoutes")
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
app.use("/accounts",accountsRoute)

app.listen(port,()=>{
    console.log("Server Started On This Port: "+ port);
})