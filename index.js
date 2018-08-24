const { ipcRenderer, remote } = require("electron");

document.addEventListener("DOMContentLoaded", init);

function init() {
  const changeBtn = document.querySelector("button#change");
  const input = document.querySelector("input");
  const quitBtn = document.querySelector("a#quit");
  const errorMsg = document.querySelector("a.error");

  // Store the query string in localStorage
  // and fill the input when app restarts
  const lastValue = localStorage.getItem("keywords");
  if (lastValue) {
    input.value = lastValue;
  }

  changeBtn.addEventListener("click", changeBackground);

  // Remove and reset placeholder
  input.addEventListener("focus", () => {
    input.setAttribute("placeholder", "");
  });
  input.addEventListener("blur", () => {
    input.setAttribute("placeholder", "Keywords");
  });
  input.addEventListener("keyup", e => {
    // Triger changeBackground when 'enter' pressed
    if (e.keyCode === 13) {
      changeBackground();
    }
  });

  quitBtn.addEventListener("click", () => {
    remote.getCurrentWindow().close();
  });

  ipcRenderer.on("changed", () => {
    // Enable input
    input.removeAttribute("disabled");

    changeBtn.classList.remove("loading");
    changeBtn.textContent = "Change Now!";
  });

  ipcRenderer.on("error", () => {
    // Enable input
    input.removeAttribute("disabled");

    changeBtn.classList.remove("loading");
    changeBtn.textContent = "Change Now!";

    // Display an error msg and remove it after 3s
    errorMsg.classList.add("visible");
    setTimeout(() => errorMsg.classList.remove("visible"), 3000);
  });

  function changeBackground() {
    // Disable input
    input.setAttribute("disabled", true);

    const value = input.value;
    ipcRenderer.send("update background", value);
    localStorage.setItem("keywords", value);
    changeBtn.classList.add("loading");
    changeBtn.textContent = "";
  }
}
