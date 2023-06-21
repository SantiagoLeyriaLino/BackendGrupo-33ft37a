const getControllerProducts = require('../controllers/getControllerProducts');

const getHandlerProducts = async (req, res) => {
	try {
		const { page } = req.query;
		const response = await getControllerProducts(page || 1);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getHandlerProducts;