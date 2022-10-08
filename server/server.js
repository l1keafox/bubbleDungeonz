const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


//Io
const http = require('http');
const ioServer = http.createServer(app);
const { Server } = require("socket.io");
// This is cheating, I wish there was an way
// to grab this server that is created.
global.io = new Server(server, {
});
const ioPORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Disable for now. -fox
// app.use(routes);

// no implmentaiton of ENV yet
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    ioServer.listen(ioPORT, () => {
      console.log(`listening on http://localHost:${ioPORT} Also socket?`);
    });    
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })

  })
  };
  startApolloServer(typeDefs, resolvers);
