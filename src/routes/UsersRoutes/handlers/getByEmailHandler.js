const getByEmailController = require('../controllers/gtByEmailController');
const getByEmailHandler = async (req, res) => {
	try {
		const email = req.params.email;
		console.log(email);
		const response = await getByEmailController(email);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = getByEmailHandler;
