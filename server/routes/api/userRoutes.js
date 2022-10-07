const router = require('express').Router();
const {
    register,
    login
} = require("../../controllers/userController");

router.route('/login').post(login);
router.route('/register').post(register);

module.exports = router;