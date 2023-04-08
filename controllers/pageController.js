const getIndexPage = (req,res)=>{
    res.render("index",{
        link:"index"
    })
}

const getProfilePage = (req,res)=>{
    res.render("profile",{
        link:"profile"
    })
}

module.exports = {getIndexPage, getProfilePage}