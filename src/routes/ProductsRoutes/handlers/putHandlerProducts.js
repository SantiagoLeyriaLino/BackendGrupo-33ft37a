const putControllerProducts = require('../controllers/putControllerProducts');

const putHandlerProducts = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;
		let firebaseUrls;
		if (req.files) {
			firebaseUrls = req.files.map((file) => file.firebaseUrl);
		}
		const response = await putControllerProducts(id, updatedData, firebaseUrls);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = putHandlerProducts;
