const getControllerStore = require('../controllers/getControllerStore')

const getHandlerStore = async (req, res) => {
    try {
        const response = await getControllerStore()
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = getHandlerStore