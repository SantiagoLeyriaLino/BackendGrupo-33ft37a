const postControllerStore = require('../controllers/postControllerStore')

const postHandlerStore = async (req, res) => {
    try {
        const data = req.body
        let fb_files = req.files
        let firebaseUrls
        if (fb_files){
            firebaseUrls = fb_files.map((file) => file.firebaseUrl)
        }
        
        const response = await postControllerStore(data, firebaseUrls)
        res.status(200).json({ message: 'Tienda agregada exitosamente!', data: response})
    } catch (err) {
        res.status(400).json( { error: err.message} )
    }
}

module.exports = postHandlerStore