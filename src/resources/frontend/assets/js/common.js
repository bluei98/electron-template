window.$ = window.jQuery = require('jquery');
const fs = require("fs");
const http = require("http")
const { ipcRenderer } = require('electron');
const { app, dialog, BrowserWindow } = require('electron').remote;
const mUtil = require('../../modules/Utils.js');

function getFolderMyDocuments() {
    return app.getPath('documents');
}

function selectFolder() {
    var path = dialog.showOpenDialogSync({
        properties: ['openDirectory']
    });

    if(typeof(path) == "undefined") return false;
    else return path[0];
}

function selectFile() {
    var path = dialog.showOpenDialogSync({
        // properties: ['openDirectory']
    });
    if(typeof(path) == "undefined") return false;
    else return path[0];    
}

function fileDownload(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    });
}

// notification("프로그램이름", "요청하신 데이터의 수집이 완료되었습니다.");
function notification(title, body) {
    const myNotification = new Notification(title, {
        body: body
    });
    
    myNotification.onclick = () => {
        console.log('Notification clicked')
    };
}

const onlineStatus = () => { return navigator.onLine; }
// window.addEventListener('online', onlineStatus);
// window.addEventListener('offline', onlineStatus);

// Dark / Light Mode
if(document.getElementById('toggle-dark-mode')) {
    document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
        const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
    });
}

if(document.getElementById('reset-to-system')) {
    document.getElementById('reset-to-system').addEventListener('click', async () => {
        await ipcRenderer.invoke('dark-mode:system')
    });
}