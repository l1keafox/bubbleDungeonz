const { Schema, model } = require("mongoose");

const scoreSchema = new Schema({
	game: {
		type: String,
		require: true,
		score: [
			{
				user: {
					type: Schema.Types.ObjectId,
					ref: "user",
				},
				score: Int,
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
});
