const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	category: {
		type: String,
		required: true,
	},

	gender: {
		type: String,
		required: true,
		enum: ['male', 'female', 'unisex'],
	},

	size: {
		type: String,
		required: true,
	},

	color: {
		type: String,
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
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
