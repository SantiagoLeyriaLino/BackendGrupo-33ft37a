const getControllerProducts = require('../controllers/getControllerSearch');

const getHandlerSearch = async (req, res) => {
	try {
		const query = req.query;
		const response = await getControllerProducts(query);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getHandlerSearch;
