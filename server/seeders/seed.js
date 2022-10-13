const db = require("../config/connection");
const { User, Channel, GameCard } = require("../models");
const userSeeds = require("./userSeeds.json");
const chatSeeds = require("./chatSeeds.json");
const gameCardSeeds = require("./gameCardSeeds.json");

db.once("open", async () => {
	try {
		await User.deleteMany({});
		await User.create(userSeeds);
		await Channel.deleteMany({});
		await Channel.create(chatSeeds);
		await GameCard.deleteMany({});
		await GameCard.create(gameCardSeeds);

		let users = await User.find();
		let channels = await Channel.find();
		let gameCards = await GameCard.find();
		console.log(channels);
		console.log(users);
		console.log(gameCards);
		for (const user of users) {
			for (const channel of channels) {
				const task = await Channel.findOneAndUpdate(
					{ _id: channel._id },
					{ $addToSet: { participants: { _id: user._id } } },
					{ runValidators: true, new: true }
				);
			}
		}

		console.log("all done!");
		process.exit(0);
	} catch (err) {
		throw err;
	}
});
