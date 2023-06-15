const getByIdControllerStore = require('../controllers/getByIdControllerStore')

const getByIdHandlerStore = async (req, res)=> {
    try {
        const { id } = req.params
        const response = await getByIdControllerStore(id)
        res.status(200).json(response)
    } catch (err){
        res.status(400).json({ error: err.message})
    }
}

module.exports = getByIdHandlerStore