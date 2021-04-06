const { app, BrowserWindow, ipcMain, nativeTheme, ipcRenderer } = require('electron');
const mUtil = require("./modules/Utils.js");

const path = require('path');
const url = require('url');

require('electron-reload')(__dirname);

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
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.webContents.toggleDevTools();
    win.removeMenu();

    // If you want load local
    win.loadFile('./resources/frontend/index.html');

    // If you want load remote
    // win.loadURL('https://www.forexliga.com/electron.html');

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        
        return nativeTheme.shouldUseDarkColors
    });

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

ipcMain.on("message", (event, json) => {
    switch(json.type) {
        case "setProgressBar":
            console.log(BrowserWindow.getAllWindows().length);
            // {type: "setProgressBar", value: 0.1}
            if (BrowserWindow.getAllWindows().length == 0) {
                wins = BrowserWindow.getAllWindows();
                wins.forEach(function(i, v) {
                    console.log(i ,v);
                });
                
            }
            break;
    }
});