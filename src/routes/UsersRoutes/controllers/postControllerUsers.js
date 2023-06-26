const Users = require('../../../db/models/usersSchema');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../../../services/nodeMailer');

const postControllerUsers = async (data, firebaseUrls) => {
	const saltRounds = 8;
	let password = await bcrypt.hash(data.password, saltRounds);
	let user = {
		name: data.name,
		email: data.email,
		image: firebaseUrls,
		password: password,
		postalCode: data.postalCode,
		city: data.city,
		country: data.country,
		phoneNumber: data.phoneNumber,
		date: data.date,
	};

	await sendEmail(data.email);

	let infoUser = await Users.create(user);
	return infoUser;
};
//comentario
module.exports = postControllerUsers;