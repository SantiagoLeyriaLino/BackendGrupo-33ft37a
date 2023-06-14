const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		required: true,
		// enum: []
	},

	gender: {
		type: String,
		required: true,
		enum: ['male', 'female', 'unisex'],
	},

	size: {
		type: [String],
		required: true,
	},

	color: {
		type: [String],
		required: true,
	},

	season: {
		type: String,
		required: true,
	},

	images: {
		type: [String],
		required: true,
	},

	stock: {
		type: Number,
		required: true,
		min: 0,
	},

	isActive: {
		type: Boolean,
		required: true,
		default: true,
	},

	brand: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: true,
	},
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
