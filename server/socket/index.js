// This is modular! Meaning you need to import this to use,
// Init should be done in server.js, there are several steps needed with express too initate.
// Once it is initated, you can use this module to grab the io.

let io; // This will hold the io server.

const initIo = (app, cors) => {
  const http = require("http");
  const ioServer = http.createServer(app);
  const socketio = require("socket.io");

  // This is cheating, I wish there was an way
  // to grab this server that is created.
  io = socketio(ioServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});  
  console.log("IO is set");
  return ioServer;

};

module.exports = { initIo, io };
