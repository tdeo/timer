const {app, globalShortcut, BrowserWindow} = require('electron');

function createWindow () {
  win = new BrowserWindow({width: 500, height: 170, nodeIntegration: false});
  win.setMenu(null);
  win.loadFile('index.html');
  globalShortcut.register('CmdOrCtrl+/', () => {
    win.webContents.executeJavaScript("add();");
  });
}

app.on('ready', createWindow);
