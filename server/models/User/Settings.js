const { Schema, model } = require("mongoose");

const settingsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	screenTextColor: {
		type: String,
	},
	linkTextColor: {
		type: String,
	},
	chatTextColor: {
		type: String,
	},
	background: {
		type: String,
	},
	chatWindow: {
		type: String,
	},
	header: {
		type: String,
	},
	//  Other values to be added in to allow more customization
});

// To be put in at once setting schema and customization options ready on frontend

module.exports = settingsSchema;
