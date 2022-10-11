const { Schema, model } = require("mongoose");

const settingsSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	textColor: {
		type: String,
		default: "black",
	},
	background: {
		type: String,
		default: "blue",
	},
	//  Other values to be added in to allow more customization
});

// To be put in at once setting schema and customization options ready on frontend

const Settings = model("settings", settingsSchema);

model.exports = Settings;
