const squaresContainer = document.getElementById("squares-container");
const body = document.querySelector('body');
const colorPicker = document.getElementById("color-picker");
const colorModeButton = document.getElementById("color-btn");
const clearButton = document.getElementById("clear-btn");
const randomColorButton = document.getElementById("random-btn");
const sizeSlider = document.getElementById("size-slider");
const sizeLabel = document.getElementById("size-label");
let gridSize = sizeSlider.value;
let currentColor = "#191717";
let currentMode = "color";

function generateGrid(size) {
    for (let row = 1; row <= size; row++) {
        const row = document.createElement("div");
        row.classList.add("row");
        squaresContainer.appendChild(row);

        for (let square = 1; square <= size; square++) {
            const square = document.createElement("div");
            square.classList.add("square");
            row.appendChild(square);
            square.addEventListener("mouseover", e => addColor(e));
        }
    }
}

function setupGrid() {
    generateGrid(16);
    colorModeButton.classList.add("picked");
}

body.onload = setupGrid();

colorPicker.addEventListener("input", () => {
    currentColor = colorPicker.value;
    colorModeButton.style.backgroundColor = currentColor;
});

colorModeButton.addEventListener("click", () => {
    currentMode = "color";
    randomColorButton.classList.remove("picked");
    colorModeButton.classList.add("picked");
});

randomColorButton.addEventListener("click", () => {
    currentMode = "random";
    colorModeButton.classList.remove("picked");
    randomColorButton.classList.add("picked");
});

clearButton.addEventListener("click", clearGrid);

sizeSlider.addEventListener("input", updateSize);

function clearGrid() {
    squaresContainer.innerHTML = null;
    generateGrid(gridSize);
}

function updateSize() {
    gridSize = sizeSlider.value;
    sizeLabel.innerText = `${gridSize} x ${gridSize}`;
    clearGrid();
}

function addColor(e) {
    if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === "random") {
        let randomColor = `#${(0x1000000+Math.random()*0xffffff).toString(16).slice(1,7)}`;
        e.target.style.backgroundColor = randomColor;
    }
}