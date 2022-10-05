const router = require('express').Router();
const channelRoutes = require('./channelRoutes');
const userRoutes = require('./userRoutes');

router.use('/channels',channelRoutes);
router.use('/users',userRoutes);

module.exports=router;