const router = require('express').Router();
const {
    getChannels,
    createChannel,
    addMessage,
    getRecentMessages,
    getXMessages
} = require('../../controllers/channelController');

router.route('/').get(getChannels).post(createChannel);
router.route('/:channelId/messages').post(addMessage).get(getRecentMessages);
router.route('/:channelId/messages/:x').get(getXMessages);

module.exports = router;