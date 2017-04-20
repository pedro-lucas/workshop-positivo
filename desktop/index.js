const electron = require('electron');
const {app, BrowserWindow} = electron;

let win;

app.on('window-all-closed', () => {
  app.quit();
});

app.on('ready', () => {

  win = new BrowserWindow({
    minWidth: 400,
    minHeight: 400,
    show: true
  });

  win.on('closed', () => {
    win = null
  });

  win.loadURL(`file://${__dirname}/static/index.html`);

});
