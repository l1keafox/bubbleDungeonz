const { Schema, model } = require("mongoose");

const settingsSchema = new Schema({
	screenTextColor: {
		type: String,
		default: "orange1",
		required: true,
	},
	linkTextColor: {
		type: String,
		required: true,
		default: "lime",
	},
	chatTextColor: {
		type: String,
		required: true,
		default: "black",
	},
	background: {
		type: String,
		required: true,
		default: "blue1",
	},
	chatWindow: {
		type: String,
		required: true,
		default: "red",
	},
	header: {
		type: String,
		required: true,
		default: "purple",
	},
	//  Other values to be added in to allow more customization
});

// To be put in at once setting schema and customization options ready on frontend

module.exports = settingsSchema;
