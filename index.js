const {shell,ipcMain: ipc,app, BrowserWindow} = require('electron');
let fs = require('fs');
let util = require('util');
const mw = require('./config/mainwindow');
const sw = require('./config/secondwindow');

require('./ipchandlers');
let mainWindow, secondWindow, windowToCapture;


app.on('ready', ()=>{
  require("./mainmenu")();
  mainWindow= require('./createwindow')(mw);
  secondWindow= require('./createwindow')(sw);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {app.quit()}
});

/*
app.on('activate', function () {
  if (mainWindow === null) {mainWindow= require('./createwindow')();}
});
*/
ipc.on('capture-window', event => {
  windowToCapture = BrowserWindow.fromId(event.sender.webContents.id);
  let bounds = windowToCapture.getBounds();
  windowToCapture.webContents.capturePage({
    x: 0, y: 0,
    width: bounds.width,
    height: bounds.height
  }, function (image) {
    let desktop = app.getPath('desktop');
    let filePath = desktop + '/' + windowToCapture.getTitle() + '-captured-file.png';
    let png = image.toPNG();
    fs.writeFileSync(filePath, png)
    
  })
});