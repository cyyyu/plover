const { app, BrowserWindow, ipcMain, Tray } = require("electron");
const path = require("path");
const changeBg = require("./lib/changeBg");

let tray = undefined;
let window = undefined;

// Hide the dock icon
app.dock.hide();

app.on("ready", init);
app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("update background", (e, val) => {
  changeBg(val).then(() => {
    e.sender.send("changed");
  });
});

function init() {
  tray = new Tray(path.join(__dirname, "asset", "image-opacity3.png"));
  tray.on("click", toggleWindow);

  window = new BrowserWindow({
    width: 200,
    height: 104,
    show: false,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, "icon.icns")
  });

  window.loadURL(`file://${path.join(__dirname, "index.html")}`);

  window.on("blur", () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
}

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

function showWindow() {
  const trayPos = tray.getBounds();
  const windowPos = window.getBounds();
  const x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
  const y = Math.round(trayPos.y + trayPos.height);

  window.setPosition(x, y, false);
  window.show();
  window.focus();
}
