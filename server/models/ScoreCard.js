const { Schema, model } = require("mongoose");

const scoreCardSchema = new Schema({
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

const ScoreCard = model("score", scoreCardSchema);

module.exports = ScoreCard;
