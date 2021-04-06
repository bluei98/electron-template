const { app, BrowserWindow, ipcMain, nativeTheme, ipcRenderer } = require('electron');
const path = require('path');

nativeTheme.themeSource = 'dark';

function createWindow() {
    const win = new BrowserWindow({
        width: 1360,
        height: 780,
        icon: './resources/icon.png',
        // resizable: false,
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false,
            // enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.webContents.toggleDevTools();
    win.removeMenu();

    // If you want load local
    win.loadFile('./resources/frontend/index.html');
    // If you want load remote
    // win.loadURL('https://www.forexliga.com/electron.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})