const { Schema, model } = require('mongoose');
const Message = require('./Message');

const channelSchema = new Schema(
    {
        channelName:{
            type:String,
            required:true
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: "user"
        }],
        messages:[Message]
    }
);

const Channel = model('channel',channelSchema)

module.exports = Channel;