const getControllerProducts = require('../controllers/getControllerSearch');

const getHandlerSearch = async (req, res) => {
	try {
		const { page } = req.query;
		const query = req.query;
		const response = await getControllerProducts(page || 1, query);
		console.log(response);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getHandlerSearch;
