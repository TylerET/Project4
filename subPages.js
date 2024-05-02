"use strict";

document.addEventListener("DOMContentLoaded", function () {
  preventDefaultForm();
  checkIfInIframe();
});

function preventDefaultForm() {
  let form = document.getElementById("contact-form");
  if (form) {
    addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

function checkIfInIframe() {
  if (window === window.top) {
    // The page is not in an iframe
    document.querySelector("footer").style.display = "block";
    let contactContainer = document.getElementById("contact-container");
    contactContainer.style.width = "60vw";
    contactContainer.style.height = "60vh";
  }
}
