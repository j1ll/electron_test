const {ipcMain: ipc, dialog, nativeImage} = require('electron');
const fs = require('fs');
const path = require('path');
let warningIcon= nativeImage.createFromPath('./img/warning.png');
ipc.on('synchronous-message', function (event, arg) {event.returnValue = 'I heard you!'});
ipc.on('asynchronous-message', function (event, arg) {
  if (arg === "That's one small step for man") {
    event.sender.send('asynchronous-reply', ', one giant leap for mankind.')
  }});

ipc.on('open-directory-dialog', function (event) {
  dialog.showOpenDialog({
    title: 'Select a workspace...',
    properties: ['openDirectory']
  }, function (files) {
    if (files) event.sender.send('selectedItem', files)
  })
});
ipc.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    title: 'Select a workspace...',
    buttonLabel: "Select...",
    properties: ['openFile'],
    filters: [{name:'Images', extensions: ['jpg','png','gif']}]
  }, function (files) {
    if (files) event.sender.send('selectedItem', files)
  })
});
ipc.on('save-file-dialog', function (event, text) {
  dialog.showSaveDialog({
    title: 'Save file...',
    buttonLabel: "Save",
    filters: [{name:'Text', extensions: ['txt']}]
  }, function (file) {
    
    if (file) {
      fs.writeFile(file,text, function (err) {
        if (err===null){console.log(file+ 'saved!')}
        else{console.log(err)}
      })
    }
  })
});

ipc.on('display-dialog', function (event, dialogType) {
  dialog.showMessageBox({
    type: dialogType,
    buttons: ['Save', 'Cancel', 'Don\'t Save'],
    defaultId: 0,
    cancelId: 1,
    title: 'Save Score',
    message: 'Backup your score file?',
    detail: 'Message detail',
    icon: warningIcon
  }, function (index) {  console.log(index);});
  console.log(dialogType);
});
