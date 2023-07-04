const Users = require('../../../db/models/usersSchema');

const getByEmailController = async (email) => {
	let response = await Users.findOne({ email: email });

	return response;
};

module.exports = getByEmailController;
