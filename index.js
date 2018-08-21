const { ipcRenderer, remote } = require("electron");

document.addEventListener("DOMContentLoaded", init);

function init() {
  const changeBtn = document.querySelector("button#change");
  const input = document.querySelector("input");
  const quitBtn = document.querySelector("a#quit");

  // Store the query string in localStorage
  // and fill the input when app restarts
  const lastValue = localStorage.getItem("keywords");
  if (lastValue) {
    input.value = lastValue;
  }

  changeBtn.addEventListener("click", () => {
    const value = input.value;
    ipcRenderer.send("update background", value);
    localStorage.setItem("keywords", value);
    changeBtn.classList.add("loading");
    changeBtn.textContent = "";

    // Append a spinner
    const spinner = document.createElement("span");
    spinner.classList.add("spinner");
    changeBtn.appendChild(spinner);
  });

  // Remove and reset placeholder
  input.addEventListener("focus", () => {
    input.setAttribute("placeholder", "");
  });
  input.addEventListener("blur", () => {
    input.setAttribute("placeholder", "Keywords");
  });

  quitBtn.addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

  ipcRenderer.on("changed", () => {
    changeBtn.classList.remove("loading");
    changeBtn.textContent = "Change Now!";
    changeBtn.removeChild(changeBtn.querySelector("span"));
  });
}
