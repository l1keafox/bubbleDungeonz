const { Schema, Types } = require("mongoose");

const scoreSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
	score: Number,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = scoreSchema;
