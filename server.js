const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_URL = `mongodb://localhost:27017/random`;

mongoose.connect(DB_URL, { useNewUrlParser: false });
let db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

app.use("/", express.static(__dirname + "/public"));
app.use("/output", express.static(__dirname + "/public/output.html"));

const Data = require("./db/data_model");

io.on("connection", socket => {
  console.log("Connected With " + socket.id);
  socket.on("givemedata", () => {
    Data.find()
      .then(r => {
        socket.emit("hereisdata", r);
      })
      .catch(err => {
        socket.emit("error", err);
      });
  });

  socket.on("data-add", picked_words => {
    console.log(picked_words);
    words = picked_words;
    Data.insertMany(words)
      .then(result => {
        console.log(result);
        socket.broadcast.emit("data-updated", {});
      })
      .catch(err => {
        console.log(err);
        socket.broadcast.emit("error", result);
      });
  });
});

server.listen(PORT, () => {
  console.log("Server started at http://localhost:" + PORT);
});
