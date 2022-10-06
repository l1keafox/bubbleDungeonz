const { Channel, User } = require('../models');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    async register(req,res){
        try {
            console.log(req.body.username);
            console.log(req.body.email);
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const insertResult = await User.create({
              username: req.body.username,
              email: req.body.email,
              password: hashedPwd,
            });
            res.send(insertResult);
          } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error occured");
          }
    },
    async login(req,res){
        try {
            const user = await User.findOne({ email: req.body.email });
            console.log(user);
            if (user) {
              const cmp = await bcrypt.compare(req.body.password, user.password);
              if (cmp) {
                //   ..... further code to maintain authentication like jwt or sessions
                if(!req.session.loggedIn){
                    console.log("logged in");
                    req.session.save(() => {
                        req.session.loggedIn = true;
                        req.session.currentUser = user.id;
                        req.session.currentUsername = user.username;
                        res.send("Authentication passed");
                    });
                }else{
                    console.log("already logged in");
                }
              } else {
                res.send("Wrong username or password.");
              }
            } else {
              res.send("Wrong username or password.");
            }
          } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error Occured");
          }
    }
};