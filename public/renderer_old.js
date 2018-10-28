"use strict";
const {ipcRenderer: ipc } = require('electron');

function _addsend(id, ...rest) {
  id.addEventListener('click', function (event) {  ipc.send(...rest)});
}


sendSyncMsgBtn.addEventListener('click', function () {
  const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.');
  syncReply.innerHTML = `Synchronous message reply: ${reply}`;
});

sendAsyncMsgBtn.addEventListener('click', function () {
  ipc.send('asynchronous-message', "That's one small step for man");
});
ipc.on('asynchronous-reply', function (event, arg) {
  asyncReply.innerHTML = `Asynchronous message reply: ${arg}`;
});


selectDirBtn.addEventListener('click', function (event) {
  ipc.send('open-directory-dialog')
});
ipc.on('selectedItem', function (event, path) {
  document.getElementById('selectedItem').innerHTML = `You selected: ${path}`;
});
selectFileBtn.addEventListener('click', function (event) { ipc.send('open-file-dialog')});
saveFileBtn.addEventListener('click', function (event) {  ipc.send('save-file-dialog')});

infoDialogBtn.addEventListener('click', function (event) {  ipc.send('display-dialog', 'info')});
errorDialogBtn.addEventListener('click', function (event) {  ipc.send('display-dialog', 'error')});
questionDialogBtn.addEventListener('click', function (event) {  ipc.send('display-dialog', 'question')});
noneDialogBtn.addEventListener('click', function (event) {  ipc.send('display-dialog', 'none')});
captureButton.addEventListener('click', function (event) {  ipc.send('capture-window')});