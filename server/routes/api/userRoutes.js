const router = require('express').Router();
const {
    register,
    login
} = require("../../controllers/userController");

router.route('/login').post(login);
router.register('/register').post(register);

module.exports = router;