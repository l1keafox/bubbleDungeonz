const { Schema, model } = require("mongoose");
const Score = require("./Score");

const scoreCardSchema = new Schema({
	title: {
		type: String,
		require: true,
	},
	scores: [Score],
	description: {
		type: String,
		require: true,
	},
});

const ScoreCard = model("scoreCard", scoreCardSchema);

module.exports = ScoreCard;
