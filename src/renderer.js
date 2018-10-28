const {BrowserWindow, dialog,} = require('electron').remote
const {ipcRenderer} = require('electron')
const path = require('path')

butn.addEventListener('click', (event) => {
  ipcRenderer.send('open-error-dialog');
  /*const modalPath = path.join('file://', __dirname, 'processcrash.html')
  let win = new BrowserWindow({ width: 400, height: 320 })
  win.webContents.openDevTools();
  win.webContents.on('crashed', () => {
    const options = {
      type: 'info',
      title: 'Renderer Process Crashed',
      message: 'This process has crashed.',
      buttons: ['Reload', 'Close']
    }
    
    dialog.showMessageBox(options, (index) => {
      if (index === 0) win.reload()
      else win.close()
    })
  })
  
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()*/
})