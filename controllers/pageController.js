const getIndexPage = (req,res)=>{
    res.render("index",{
        link:"index"
    })
}

module.exports = {getIndexPage}