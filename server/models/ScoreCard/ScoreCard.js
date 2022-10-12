const { Schema, model } = require("mongoose");
const Score = require("./Score");

const scoreCardSchema = new Schema({
	game: {
		type: String,
		require: true,
	},
	scores: [Score],
});

const ScoreCard = model("score", scoreCardSchema);

module.exports = ScoreCard;
