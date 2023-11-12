/* eslint-env browser */

import "./styles/app.css";

let timeIn: ReturnType<typeof setTimeout>;
let timeOut: ReturnType<typeof setTimeout>;
const eyeElement = document.querySelector(".eye");

eyeElement.addEventListener("mouseenter", closeEye);
eyeElement.addEventListener("mouseleave", openEye);

openEye();

// ---------------------------------------------------------------------------- //

function openEye() {
  eyeElement.classList.remove("eye-closed");
  startBlinking();
}

function closeEye() {
  stopBlinking();
  eyeElement.classList.add("eye-closed");
}

function startBlinking(duration = 250, delay = random(5000, 10000)) {
  timeIn = setTimeout(() => {
    closeEye();
    timeOut = setTimeout(openEye, duration);
  }, delay);
}

function stopBlinking() {
  clearInterval(timeIn);
  clearInterval(timeOut);
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
