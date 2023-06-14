const getProductsById = require('../controllers/getProductById');

const getByIdHandler = async (req, res) => {
	try {
		const { id } = req.params;
		const response = await getProductsById(id);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getByIdHandler;
