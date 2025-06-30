const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  ["dot1Toggle", "dot2Toggle", "dot3Toggle", "cameraToggle"].forEach((event) => {
    socket.on(event, (data) => {
      socket.broadcast.emit(event, data);
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});
