window.$ = window.jQuery = require('jquery');
const { ipcRenderer, BrowserWindow  } = require('electron');
const mUtil = require('../../modules/Utils.js');

// Dark / Light Mode
document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await ipcRenderer.invoke('dark-mode:toggle')
});

document.getElementById('reset-to-system').addEventListener('click', async () => {
    await ipcRenderer.invoke('dark-mode:system')
});

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