const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const utils = require('./utils')

let win;

function createWindow () {
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    darkTheme: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(utils.link)

  // Open the DevTools.
}

function toggleDevTools() {
    win.webContents.toggleDevTools()
}

function reloadPage(){
    win.reload()
}

function createShortcuts() {
    globalShortcut.register('CmdOrCtrl+Shift+I', toggleDevTools);
    globalShortcut.register('CmdOrCtrl+R', reloadPage);
}

const menu = Menu.buildFromTemplate([]);
Menu.setApplicationMenu(menu);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow).then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // No macOS é comum para aplicativos e sua barra de menu 
  // permaneçam ativo até que o usuário explicitamente encerre com Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})