const { Schema, model } = require("mongoose");

const settingsSchema = new Schema({
	screenTextColor: {
		type: String,
		required: true,
	},
	linkTextColor: {
		type: String,
		required: true,
	},
	chatTextColor: {
		type: String,
		required: true,
	},
	background: {
		type: String,
		required: true,
	},
	chatWindow: {
		type: String,
		required: true,
	},
	header: {
		type: String,
		required: true,
	},
	//  Other values to be added in to allow more customization
});

// To be put in at once setting schema and customization options ready on frontend

module.exports = settingsSchema;
