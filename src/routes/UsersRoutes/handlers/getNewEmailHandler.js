const getNewEmailController = require('../controllers/getNewEmailController');

const getNewEmailHandler = async (req, res) => {
	try {
		const email = req.params.email;
		console.log(email);
		const response = await getNewEmailController(email);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getNewEmailHandler;
