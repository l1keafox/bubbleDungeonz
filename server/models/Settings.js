const { Schema, model } = require("mongoose");

const settingsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	screenTextColor: {
		type: String,
		default: "orange1",
	},
	linkTextColor: {
		type: String,
		default: "lime",
	},
	chatTextColor: {
		type: String,
		default: "black",
	},
	background: {
		type: String,
		default: "blue1",
	},
	chatWindow: {
		type: String,
		default: "red",
	},
	header: {
		type: String,
		default: "purple",
	},
	//  Other values to be added in to allow more customization
});

// To be put in at once setting schema and customization options ready on frontend

const Settings = model("settings", settingsSchema);

model.exports = Settings;
