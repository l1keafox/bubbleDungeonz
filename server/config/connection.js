const { connect, connection } = require('mongoose');

connect('mongodb://localhost/projectThree', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
