const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const routes = require('./routes');
const shortcut = require('./shortcut');

let win;

function createWindow() {

    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(`file://${__dirname}/view/index.html`);

    win.on('closed', () => {
        win = null;
    });

    routes();
    shortcut();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
    app.quit();
    }
});

app.on('activate', () => {
    if (win === null){
    createWindow();
    }
});
