const socket = io();

socket.on("connect", () => {
  console.log("Connected " + socket.id);
  socket.emit("givemedata");
});

socket.on("data-updated", () => {
  socket.emit("givemedata");
});
let x = ``;
let g_data = [];

socket.on("hereisdata", data => {
  console.log(data);

  g_data = data;
  createX();
  printData(data);
});

function printData(data) {
  data.forEach(d => {
    x += `<tr><td>${d.date}</td><td>${d.word}</td><td>${d.pos} %</td></tr> \n`;
  });
  $("#tab").html(x);
}
function createX() {
  x = ``;
  x = ` <tr>
            <th>Timestamp <span><button onclick='time_d()'>&#8681;</button> <button onclick='time_u()'>&#8679;</button></span></th>
            <th>Word  <span><button onclick='word_d()'>&#8681;</button> <button onclick='word_u()'> &#8679;</button></span></th>
            <th>Location in text <span><button onclick='pos_d()'>&#8681;</button> <button onclick='pos_u()'>&#8679;</button></span></th>
        </tr>`;
}

//sorting
function time_d() {
  x = ``;
  createX();
  g_data.reverse();
  printData(g_data);
}

function time_u() {
  socket.emit("givemedata");
}
function word_d() {
  x = ``;
  createX();
  g_data.sort(compare);
  printData(g_data);
}

function word_u() {
  x = ``;
  createX();
  g_data.sort(compare).reverse();
  printData(g_data);
}
function pos_d() {
  x = ``;
  createX();
  g_data.sort((a, b) => b.pos - a.pos);
  printData(g_data);
}

function pos_u() {
  x = ``;
  createX();
  g_data.sort((a, b) => a.pos - b.pos);
  printData(g_data);
}

function compare(a, b) {
  if (a.word < b.word) {
    return -1;
  }
  if (a.word > b.word) {
    return 1;
  }
  return 0;
}
