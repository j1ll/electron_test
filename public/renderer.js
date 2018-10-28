"use strict";
const {ipcRenderer: ipc } = require('electron');
let util = require('util');
selectedItem.value=(util.inspect(require('electron'), { showHidden: true, depth: 0}));
function _addsend(arr) {
  for (let lis of arr){
    lis.elem.addEventListener('click', function (event){ ipc.send(...lis.args)});
  }
}

let arr = [
  {elem:sendAsyncMsgBtn ,   args: ['asynchronous-message', "That's one small step for man"]},
  {elem:selectDirBtn ,      args: ['open-directory-dialog']},
  {elem:selectFileBtn ,     args: ['open-file-dialog']},
  // {elem:saveFileBtn ,       args: ['save-file-dialog', selectedItem.value]},
  {elem:infoDialogBtn ,     args: ['display-dialog', 'info']},
  {elem:errorDialogBtn ,    args: ['display-dialog', 'error']},
  {elem:questionDialogBtn , args: ['display-dialog', 'question']},
  {elem:noneDialogBtn ,     args: ['display-dialog', 'none']},
  {elem:captureButton ,     args: ['capture-window']},
];
_addsend(arr);

saveFileBtn.addEventListener('click', function (event){
  console.dir(selectedItem);
  ipc.send('save-file-dialog', selectedItem.value);
})




sendSyncMsgBtn.addEventListener('click', function () {
  const reply = ipc.sendSync('synchronous-message', 'Mr. Watson, come here.');
  syncReply.innerHTML = `Synchronous message reply: ${reply}`;
});


ipc.on('asynchronous-reply', function (event, arg) {
  asyncReply.innerHTML = `Asynchronous message reply: ${arg}`;
});


ipc.on('selectedItem', function (event, path) {
  document.getElementById('selectedItem').value = `You selected: ${path}`;
  console.log(document.getElementById('selectedItem').value+"!!!");
  console.log(selectedItem.value+"!!!");
});
