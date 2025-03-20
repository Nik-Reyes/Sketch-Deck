const generateTiles = (...numOfTiles) => {
  const sketchArea = document.querySelector(".sketch-area");
  const grid = document.createDocumentFragment();
  const row = document.createElement("div");
  row.className = "tile-row";

  for (let i = 0; i < numOfTiles[0]; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile", "border");
    const center = document.createElement("div");
    center.className = "center-tile";
    tile.appendChild(center);
    row.appendChild(tile);
  }

  for (let i = 0; i < numOfTiles[0]; i++) {
    grid.appendChild(row.cloneNode(true));
  }
  sketchArea.appendChild(grid);
};

const paintTile = (e) => {
  //known bug: right click still allows painting
  if (e.button === 0) {
    const tile = e.target;
    const computedBgColor =
      getComputedStyle(tile).getPropertyValue("background-color");
    const colorValues = computedBgColor.match(/[\d.]+/g);
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
  console.log(tileList);
  tileList.forEach((row) => row.remove());
  generateTiles(input.value, input.value);
};

function toggleCenterTacks() {
  const centers = document.querySelectorAll(".center-tile");
  console.log(centers);
  centers.forEach((center) => center.classList.toggle("hidden"));
}

const toggleBorders = () => {
  const tiles = document.querySelectorAll(".tile");
  console.log("hi");
  tiles.forEach((tile) => tile.classList.toggle("border"));
};

generateTiles((x = 16), (y = 16));

const resetButton = document.querySelector("#clear-grid");
const sketchArea = document.querySelector(".sketch-area");
const borderButton = document.querySelector("#toggle-borders");
const centerButton = document.querySelector("#toggle-centers");
const form = document.querySelector("#grid-size");
const input = document.querySelector("#grid-dimensions");

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
