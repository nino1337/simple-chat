var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const PORT = parseInt(process.env.PORT, 10) || 6006;

// set up websocket
io.on("connection", socket => {
  console.log(`user connected to socket: ${socket.id}`);
});

// set static path
app.use(express.static("client/dist"));

// set server port
http.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
