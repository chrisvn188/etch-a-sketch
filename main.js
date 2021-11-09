// Default variables
const DEFAULT_SIZE = 16;
const DEFAULT_SKETCH_BACKGROUND_COLOR = "#EEEBDD";
const DEFAULT_PEN_COLOR = "#000000";

// Variables that will change
let currentGridSize = DEFAULT_SIZE;
let currentPenColor = DEFAULT_PEN_COLOR;
let currentMode = "";

// get UI elements
const sketchContainer = document.querySelector("#sketch-container");
const penColorInput = document.querySelector("#pen-cl-input");
const sketchBackgroundInput = document.querySelector("#sketch-bg-input");
const solidMode = document.querySelector("#solid-mode");
const rainbowMode = document.querySelector("#rainbow-mode");
const eraserMode = document.querySelector("#eraser-mode");
const clearBtn = document.querySelector("#clear-btn");
const sliderLabel = document.querySelector(`label[for="size-slider"]`);
const sizeSlider = document.querySelector("#size-slider");
const modes = document.querySelectorAll(".mode-btn");

// Create a grid then append child elements
function createGrid(size) {
  sketchContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement("div");
      sketchContainer.appendChild(div);
    }
  }

  let cells = sketchContainer.querySelectorAll("div");
  cells.forEach((cell) => cell.addEventListener("mouseover", e => e.target.style.backgroundColor = currentPenColor));
}

// By default, pen color input field is disabled 
function setUpDefaultSketch() {
  createGrid(currentGridSize);

  penColorInput.disabled = true;
  penColorInput.value = DEFAULT_PEN_COLOR;
  
  sketchBackgroundInput.value = DEFAULT_SKETCH_BACKGROUND_COLOR;
  sketchContainer.style.backgroundColor = DEFAULT_SKETCH_BACKGROUND_COLOR;
}

function setCurrentMode(e) {
  currentMode = e.target.getAttribute("data-mode");
  e.target.classList.add("active");

  // remove active class on other mode
  modes.forEach((mode) => {
    if (mode.getAttribute("data-mode") !== currentMode) {
      mode.classList.remove("active");
    }
  });

  let cells = sketchContainer.querySelectorAll("div");

  // pen color input is not disabled in solid mode
  switch (currentMode) {
    case "solid":
      penColorInput.disabled = false;
      cells.forEach((cell) =>
        cell.addEventListener("mouseover", (e) => {
          e.target.style.backgroundColor = penColorInput.value;
        })
      );
      break;

    case "rainbow":
      penColorInput.disabled = true;
      cells.forEach((cell) =>
        cell.addEventListener("mouseover", (e) => {
          let randomRed = Math.floor(Math.random() * 255);
          let randomGreen = Math.floor(Math.random() * 255);
          let randomBlue = Math.floor(Math.random() * 255);
          let penColor = `RGB(${randomRed},${randomGreen},${randomBlue})`;
          e.target.style.backgroundColor = penColor;
        })
      );
      break;

    case "eraser":
      penColorInput.disabled = true;
      cells.forEach(cell => cell.addEventListener('mouseover', e => {
        e.target.removeAttribute('style');
      }));
      break;
  }
}

// change pen input
penColorInput.addEventListener("change", (e) => {
  currentPenColor = e.target.value;
});

// change background input
sketchBackgroundInput.addEventListener("change", (e) => {
  sketchContainer.style.backgroundColor = e.target.value;
});

sizeSlider.addEventListener('change', e =>{
  sketchContainer.innerHTML = "";
  createGrid(e.target.value);
  currentPenColor = penColorInput.value;
  sliderLabel.textContent = `${e.target.value} x ${e.target.value}`;
});

// set current mode when btn clicked
modes.forEach((mode) => mode.addEventListener("click", setCurrentMode));


clearBtn.addEventListener('click', e => {
  let cells = sketchContainer.querySelectorAll('div');
  cells.forEach(cell => cell.removeAttribute('style'));
});

window.onload = function () {
  setUpDefaultSketch();
};
