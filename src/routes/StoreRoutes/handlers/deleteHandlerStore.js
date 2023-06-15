const deleteControllerStore = require('../controllers/deleteControllerStore')

const deleteHandlerStore = async (req, res)=> {
    try {
        const { id } = req.params
        if (id) {
            const response = await deleteControllerStore(id)
            res.status(200).json({ message: 'Tienda eliminada con éxito', data: response })
        } else {
            throw new Error('Se esperaba un ID.')
        }
    } catch (err){
        res.status(400).json({ error: err.message })
    }
}

module.exports = deleteHandlerStore