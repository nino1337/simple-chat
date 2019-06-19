var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const PORT = parseInt(process.env.PORT, 10) || 6006;

// set up websocket
io.on("connection", socket => {
  console.log(`user connected to socket: ${socket.id}`);

  socket.on("message", function(data) {
    io.sockets.emit("message", data);
  });

  socket.on("usertyping", function(data) {
    io.sockets.emit("usertyping", data);
  });
});

// set static path
app.use(express.static("client/dist"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// set server port
http.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
