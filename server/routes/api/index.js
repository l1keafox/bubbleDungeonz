const router = require('express').Router();
const channelRoutes = require('./channelRoutes');

router.use('/channels',channelRoutes);

module.exports=router;