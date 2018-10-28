const {shell, BrowserWindow, globalShortcut, webContents} = require('electron');
const mw = require('./config/mainwindow');
const path = require('path'),url = require('url');

function createWindow (config) {
  let win = new BrowserWindow(config.options);
  win.webContents.on('did-start-loading', event => {
    console.log('did-start-loading', event.sender.webContents.browserWindowOptions.title)
  });
  win.webContents.on('dom-ready', event => {
    console.log('dom-ready')
  });
  win.webContents.on('did-finish-load', event => {
    console.log('did-finish-load', BrowserWindow.fromId(event.sender.webContents.id).getTitle())
  });
  win.webContents.on('did-stop-loading', event => {
    console.log('did-stop-loading', event.sender.webContents.id)
  });
  
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'public', config.fileStr),
    protocol: 'file:',
    slashes: true
  }));
  win.webContents.openDevTools();
  win.once('ready-to-show', function () {
    win.show();
  });
  win.on('closed', function () {
    win = null
  });
  
  globalShortcut.register('CommandOrControl+Shift+X', () => {
    console.log('CommandOrControl+Shift+X is pressed')
  });
  return win;
  let filePath = app.getAppPath() + '/test.txt'
  shell.showItemInFolder(filePath)
}
module.exports = createWindow;