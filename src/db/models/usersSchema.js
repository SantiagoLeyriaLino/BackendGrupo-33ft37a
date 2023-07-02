const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const usersScheme = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: [String],
			default: [
				'https://st2.depositphotos.com/1523669/6194/i/950/depositphotos_61945927-stock-photo-icon-of-businessman.jpg',
			],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (value) {
					return this.constructor
						.findOne({ email: { $regex: new RegExp(`^${value}$`, 'i') } })
						.then((existingEmail) => !existingEmail);
				},
				message: 'El email ya existe.',
			},
		},
		password: {
			type: String,
			required: true,
		},
		postalCode: {
			type: Number,
		},
		city: {
			type: String,
		},
		country: {
			type: String,
		},
		phoneNumber: {
			type: String,
		},
		date: {
			type: String,
		},
		purchaseHistory: {
			type: [mongoose.Types.ObjectId],
			ref: 'Transactions',
			autopopulate: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		// reviewsHistory:{
		//     type: mongoose.Types.ObjectId,
		//     ref: 'reviews',
		// },
		isAdmin: {
			type: Boolean,
			default: false,
		},
		validated:{
			type:Boolean,
			default:false
		},
		cpDesc:{
			type: Number,
			default: 1
		}
	},
	{
		versionKey: false,
	},
);

usersScheme.index({ email: 1 }, { unique: true });


usersScheme.plugin(autopopulate);

module.exports = mongoose.model('Users', usersScheme);
