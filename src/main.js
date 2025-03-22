const generateTiles = (...numOfTiles) => {
  const sketchArea = document.querySelector(".sketch-area");
  const grid = document.createDocumentFragment();
  const row = document.createElement("div");
  row.className = "tile-row";

  for (let i = 0; i < numOfTiles[0]; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    const center = document.createElement("div");
    center.classList.add("center-tile", "hidden");
    tile.appendChild(center);
    row.appendChild(tile);
  }

  for (let i = 0; i < numOfTiles[0]; i++) {
    grid.appendChild(row.cloneNode(true));
  }
  sketchArea.appendChild(grid);
};

function shadeBrush(tile, bgcolor) {
  const colorValues = bgcolor.match(/[\d.]+/g);
  let alpha = colorValues.length === 3 ? 1.0 : parseFloat(colorValues[3]);

  if (alpha !== 1.0) {
    if (!alpha > 0) {
      alpha = 0.5;
    } else {
      alpha += 0.1;
    }
    tile.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${alpha})`;
  }
}

function blackBrush(tile) {
  tile.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${1})`;
}

function rainbowBrush(tile, bgcolor) {}

function eraseBrush(tile) {
  console.log(tile);
  tile.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${0})`;
}

const paintTile = (e) => {
  //known bug: right click still allows painting
  if (e.button === 0) {
    const tile = e.target.closest(".tile");
    const computedBgColor =
      getComputedStyle(tile).getPropertyValue("background-color");

    switch (brushMode) {
      case 1:
        shadeBrush(tile, computedBgColor);
        break;
      case 2:
        rainbowBrush();
        break;
      case 3:
        if (tile.style.backgroundColor !== "") {
          eraseBrush(tile);
        }
        break;
      default:
        blackBrush(tile);
    }
  }
};

function clearGrid() {
  const tiles = document.querySelectorAll(".tile");
  const tileArray = Array.from(tiles).filter((tile) => {
    return (
      getComputedStyle(tile).getPropertyValue("background-color") !==
      "rgba(0, 0, 0, 0)"
    );
  });
  tileArray.forEach(
    (tile) => (tile.style.backgroundColor = `rgba(0, 0, 0, 0)`)
  );
}

const resizeGrid = (e) => {
  e.preventDefault();
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      console.log("Warning!\nMust input a value");
    } else if (input.validity.patternMismatch) {
      console.log("Please enter only digits [1-9]");
    }
    return;
  }
  const tileList = document.querySelectorAll(".tile-row");
  tileList.forEach((row) => row.remove());
  generateTiles(input.value, input.value);
};

function toggleCenterTacks() {
  const centers = document.querySelectorAll(".center-tile");
  centers.forEach((center) => center.classList.toggle("hidden"));
}

const toggleBorders = () => {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => tile.classList.toggle("border"));
};

generateTiles((x = 16), (y = 16));

let brushMode = 1;
const resetButton = document.querySelector("#clear-grid");
const sketchArea = document.querySelector(".sketch-area");
const borderButton = document.querySelector("#toggle-borders");
const centerButton = document.querySelector("#toggle-centers");
const form = document.querySelector("#grid-size");
const input = document.querySelector("#grid-dimensions");
const shadeMode = document.querySelector("#shade");
const blackMode = document.querySelector("#black");
const rainbowMode = document.querySelector("#rainbow");
const eraseMode = document.querySelector("#erase");

sketchArea.addEventListener("mousedown", () => {
  sketchArea.addEventListener("mouseover", paintTile);
});

sketchArea.addEventListener("mousedown", paintTile);

sketchArea.addEventListener("mouseup", () => {
  sketchArea.removeEventListener("mouseover", paintTile);
});

sketchArea.addEventListener("mouseleave", () => {
  sketchArea.removeEventListener("mouseover", paintTile);
});

form.addEventListener("submit", resizeGrid);
borderButton.addEventListener("click", toggleBorders);
resetButton.addEventListener("click", clearGrid);
centerButton.addEventListener("click", toggleCenterTacks);
blackMode.addEventListener("click", () => (brushMode = 0));
shadeMode.addEventListener("click", () => (brushMode = 1));
eraseMode.addEventListener("click", () => (brushMode = 3));
