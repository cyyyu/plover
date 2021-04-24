document.addEventListener("DOMContentLoaded", init);

function init() {
  const changeBtn = document.querySelector("button#change");
  const input = document.querySelector("input");
  const quitBtn = document.querySelector("#quit");
  const errorMsg = document.querySelector("#error");

  // auto focus
  input.focus();

  // default keywords
  input.value = "night,stars";

  // Store the query string in localStorage
  // and fill the input when app restarts
  const lastValue = localStorage.getItem("keywords");
  if (lastValue) {
    input.value = lastValue;
  }

  changeBtn.addEventListener("click", changeBackground);

  input.addEventListener("keyup", (e) => {
    // Triger changeBackground when 'enter' pressed
    if (e.keyCode === 13) {
      changeBackground();
    }
  });

  quitBtn.addEventListener("click", () => {
    window.api.closeWindow();
  });

  window.api.receive("changed", () => {
    // Enable input
    input.removeAttribute("disabled");

    changeBtn.classList.remove("loading");
  });

  window.api.receive("error", () => {
    // Enable input
    input.removeAttribute("disabled");

    changeBtn.classList.remove("loading");

    // Display an error msg and remove it after 3s
    errorMsg.classList.add("visible");
    setTimeout(() => errorMsg.classList.remove("visible"), 3000);
  });

  function changeBackground() {
    // Disable input
    input.setAttribute("disabled", true);

    const value = input.value;
    window.api.send("update background", value);
    localStorage.setItem("keywords", value);
    changeBtn.classList.add("loading");
  }
}
