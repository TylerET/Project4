"use strict";
document.addEventListener("DOMContentLoaded", function () {
  addEventListenerToWindows();
  fetchData();
});

let dialog = {};

function fetchData() {
  fetch("dialog.json")
    .then((response) => response.json())
    .then((data) => {
      dialog = data;
    })
    .catch((error) => console.error("Error fetching dialog json:", error));
}

function addEventListenerToWindows() {
  const windows = document.getElementsByClassName("window");
  Array.from(windows).forEach((window) => {
    $(window)
      .draggable({
        containment: "parent",
        scroll: false,
        stack: ".window",
        handle: ".title-bar",
      })
      .resizable({ containment: "parent" });
  });
  const startBtn = document.getElementById("start-button");
  startBtn.addEventListener("click", toggleNav);
  addWindowLogic();
}

function setSpeechBubbleText(text) {
  document.getElementById("speech-bubble").textContent = text;
}

function addWindowLogic() {
  const shortcuts = document.querySelectorAll(".shortcut");
  shortcuts.forEach((shortcut) => {
    const id = shortcut.id.split("-");
    shortcut.addEventListener("click", () => {
      openWindow(id[0]);
    });
    shortcut.addEventListener("mouseover", () => {
      setSpeechBubbleText(dialog[id[0]] ?? "Click here!");
    });
    shortcut.addEventListener("mouseout", () => {
      setSpeechBubbleText("Welcome to Pets Under The Sun!");
    });
  });
  const closeButtons = document.querySelectorAll(".close-btn");
  closeButtons.forEach((closeBtn) => {
    const id = closeBtn.id.split("-");
    closeBtn.addEventListener("click", () => {
      closeWindow(id[0]);
    });
  });
}

const getMaxZIndex = () => {
  const windows = document.querySelectorAll(".window");
  let max = 0;
  windows.forEach((wnd) => {
    const zIndex = parseInt(getComputedStyle(wnd).zIndex, 10);
    if (!isNaN(zIndex)) {
      max = Math.max(max, zIndex);
    }
  });
  return max;
};

function openWindow(id) {
  let element = document.getElementById(id);
  let progressBar = $(element).find(".progressbar");
  let content = $(element).find(".window-content");

  element.style.display = "block";
  element.style.zIndex = getMaxZIndex() + 1;

  progressBar.progressbar({
    value: 0,
  });
  content.hide();
  progressBar.progressbar("value", 0);
  $(progressBar).animate(
    {
      value: 100,
    },
    {
      duration: 1500,
      step: function (now) {
        $(this).progressbar("value", now);
      },
      complete: function () {
        progressBar.hide();
        content.show();
      },
    }
  );
}

function toggleNav() {
  let element = document.getElementById("taskbarMenu");
  let current = element.style.display;
  element.style.display =
    current === "none" || current === "" ? "block" : "none";
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none";
}
