const {app, globalShortcut, BrowserWindow} = require('electron');

function createWindow () {
  win = new BrowserWindow({width: 500, height: 250, nodeIntegration: false});
  win.setMenu(null);
  win.loadFile('index.html');
  globalShortcut.register('CmdOrCtrl+/', () => {
    win.webContents.executeJavaScript("add();");
  });
  globalShortcut.register('CmdOrCtrl+Shift+/', () => {
    win.webContents.executeJavaScript("remove();");
  });
  globalShortcut.register('CmdOrCtrl+.', () => {
    win.webContents.executeJavaScript("pauseUnpause();");
  });
}

app.on('ready', createWindow);
