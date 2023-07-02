const postContactUsController = require('../controllers/postContactUsController')

const postContactUsHandler = async(req,res) =>{
    try{
        const data = req.body;
        let info = await postContactUsController(data)
        res.status(200).json(info)
    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports = postContactUsHandler