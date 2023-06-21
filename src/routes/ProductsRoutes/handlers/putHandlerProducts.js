const putControllerProducts = require('../controllers/putControllerProducts');

const putHandlerProducts = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		const response = await putControllerProducts(id, updatedData);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = putHandlerProducts;