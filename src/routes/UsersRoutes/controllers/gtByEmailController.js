const Users = require('../../../db/models/usersSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { TOKEN_KEY } = process.env;

const getByEmailController = async (email) => {
	// console.log(email);
	let response = await Users.findOne({ email: email });
	const token = jwt.sign(
		{
			_id: response._id,
			email: response.email,
			isAdmin: response.isAdmin,
		},
		TOKEN_KEY,
		{
			expiresIn: '7d',
		},
	);
	response = { ...response.toObject(), token: token };
	return response;
};

module.exports = getByEmailController;
