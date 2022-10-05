const { Channel, User } = require('../models');

module.exports={
    getChannels(req,res){
        Channel.find().then((channels)=>res.json(channels))
    },
    //gets messages sent within a given time of the request (default ten minutes?)
    getXMessages(req,res){
        let numToFetch = parseInt(req.params.x);
        Channel.findById(req.params.channelId,function(err,channel){
            if(err){
                res.status(500).json(err);
                return;
            }
            if(!channel){
                res.status(404).json({ message: 'No channel with that ID' });
            }else{
                if(channel.messages.length < numToFetch){
                    res.json(channel.messages);
                }else{
                    res.json(channel.messages.slice(-1*numToFetch));
                }
                
            }
            
        })
    },
    getOneChannel(req,res){
        Channel.findById(req.params.channelId,function(err,channel){
            if(err){
                res.status(500).json(err);
                return;
            }
            !channel
            ? res.status(404).json({ message: 'No channel with that ID' })
            : res.json(channel)
        })
    },
    createChannel(req,res){
        Channel.create(req.body)
        .then((channel) => {
            console.log(channel);
            res.json('Created the channel🎉')
          })
        .catch((err)=> res.status(500).json(err));
    },
    addMessage(req,res){
        Channel.findOneAndUpdate(
            {_id: req.params.channelId},
            { $addToSet: { messages: req.body } },
            { runValidators: true, new: true }
        ).then((channel)=>
            !channel
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(channel)
        ).catch((err) => res.status(500).json(err));
    },
    getRecentMessages(req,res){
        Channel.findById(req.params.channelId,function(err,channel){
            if(err){
                res.status(500).json(err);
                return;
            }
            if(!channel){
                res.status(404).json({ message: 'No channel with that ID' });
            }else{
                if(channel.messages.length < 50){
                    res.json(channel.messages);
                }else{
                    res.json(channel.messages.slice(-50));
                }
                
            }
            
        })
    }
}