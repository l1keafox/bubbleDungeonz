const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
	game: {
		type: String,
		require: true,
	},
	scores: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "user",
			},
			score: Number,
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
});

const Score = model("score", scoreSchema);

module.exports = Score;
