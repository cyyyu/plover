const { app, BrowserWindow, ipcMain, Tray } = require("electron");
const path = require("path");
const changeBg = require("./lib/changeBg");

const DEV_MODE = process.env.PLOVER_ENV === "development";

let tray = undefined;
let window = undefined;

// Hide the dock icon
DEV_MODE || app.dock.hide();

app.on("ready", init);
app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.on("update background", (e, val) => {
  changeBg(val)
    .then(() => {
      e.sender.send("changed");
    })
    .catch((e) => {
      // Network error
      e.sender.send("error", e);
    });
});

function init() {
  tray = new Tray(path.join(__dirname, "asset", "ploverIconTemplate.png"));
  tray.on("click", toggleWindow);

  window = new BrowserWindow({
    width: DEV_MODE ? 800 : 200,
    height: DEV_MODE ? 600 : 102,
    show: DEV_MODE ? true : false,
    frame: false,
    resizable: false,
    icon: path.join(__dirname, "icon.icns"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "lib", "preload.js"),
    },
  });

  DEV_MODE && window.webContents.openDevTools();

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
