const Users = require('../../../db/models/usersSchema');

const getByEmailController = async (email) => {
	// console.log(email);
	const response = await Users.findOne({ email: email });
	return response;
};

module.exports = getByEmailController;
