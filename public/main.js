let text = ``;
let socket = io();
let words = [];
let picked_words = [];

socket.on("connect", () => {
  console.log("Connected " + socket.id);
});

$("#throw").click(() => {
  extractWords();
  socket.emit("data-add", picked_words);
});

function extractWords() {
  text = $("#words").val();
  words = [];
  picked_words = [];

  words = text.split(" ");
  for (let i = 0; i < 5; i++) {
    let x = randomIntGenerator(words.length - 1);
    let pos = ((text.indexOf(words[x]) + 1) * 100) / text.length;
    let obj = {
      word: words[x],
      pos: Math.round(pos * 10) / 10,
      date: new Date().toString().slice(0, 24)
    };
    picked_words.push(obj);
  }
}

function randomIntGenerator(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
