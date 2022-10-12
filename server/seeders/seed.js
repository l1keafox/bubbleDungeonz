const db = require("../config/connection");
const { User,Channel } = require("../models");
const userSeeds = require("./userSeeds.json");
const chatSeeds = require("./chatSeeds.json");

db.once("open", async () => {
	try {
		await User.deleteMany({});
		await User.create(userSeeds);
		await Channel.deleteMany({});
		await Channel.create(chatSeeds);

		let users = await User.find();
		let channels = await Channel.find();
		console.log(channels);
		console.log(users);
		for(const user of users){
			for(const channel of channels){
				const task = await Channel.findOneAndUpdate(
					{_id: channel._id},
					{ $addToSet: { participants: {_id:user._id} } },
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
