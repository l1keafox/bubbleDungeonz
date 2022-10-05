const router = require('express').Router();
const apiRoutes = require('./api');
const bcrypt = require('bcrypt');

router.use('/api', apiRoutes);


router.get('/express_backend', (req, res) => { //Line 9
    console.log("In call serverside");
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});




module.exports = router;
