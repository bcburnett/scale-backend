var gateway = `ws://192.168.1.132/ws`;
var websocket;
var state = {};
var json = {};
window.addEventListener('load', onLoad);

function initWebSocket() {
  console.log('Trying to open a WebSocket connection...');
  websocket = new WebSocket(gateway);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
  websocket.onmessage = onMessage;
}

function onOpen(event) {
  console.log('Connection opened');
}

function onClose(event) {
  console.log('Connection closed');
  setTimeout(initWebSocket, 2000);
}

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

function onMessage(event) {
  json = JSON.parse(event.data);
  if (json.reload == "true") location.reload();
} // on page load


function onLoad(event) {
  initWebSocket(); // document.getElementById("upload").addEventListener("change", (e) => processFile(e));
}