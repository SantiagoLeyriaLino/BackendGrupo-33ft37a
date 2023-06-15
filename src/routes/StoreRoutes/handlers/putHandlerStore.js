const putControllerStore = require('../controllers/putControllerStore')

const putHandlerStore = async (req, res)=> {
    try {
        const id = req.params.id
        const { value } = req.body // formato: ID por params, value: { name: 'nuevoNombre' } }
        if (id && value && Object.keys(value).length) {
            const response = await putControllerStore(id, value)
            res.status(200).json({ message: 'Propiedad modificada correctamente!', data: response })
        } else {
            throw new Error('Datos de la petición incompletos.')
        }
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = putHandlerStore