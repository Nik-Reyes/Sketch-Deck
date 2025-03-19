// rest parameter allows for variable skecth area size (square, portrait, landscape)
const generateTiles = (...numOfTiles) => {
  const sketchArea = document.querySelector(".sketch-area");
  const grid = document.createDocumentFragment();
  const row = document.createElement("div");
  row.className = "tile-row";

  for (let i = 0; i < numOfTiles[0]; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    row.appendChild(tile);
  }

  for (let i = 0; i < numOfTiles[0]; i++) {
    grid.appendChild(row.cloneNode(true));
  }

  sketchArea.appendChild(grid);
};
generateTiles((x = 20), (y = 50));

const paintTile = (e) => {
  //known bug: right click still allows painting
  if (e.button === 0) {
    const tile = e.target;
    const computedBgColor =
      getComputedStyle(tile).getPropertyValue("background-color");
    const colorValues = computedBgColor.match(/[\d.]+/g);
    let alpha = colorValues.length === 3 ? 1 : parseFloat(colorValues[3]);

    if (!alpha > 0) {
      alpha = 0.5;
    } else {
      alpha += 0.1;
    }
    tile.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${alpha})`;
  }
};

const sketchArea = document.querySelector(".sketch-area");
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

const resetButton = document.querySelector("#clear-grid");
resetButton.addEventListener("click", () => {
  tiles = Array.from(document.querySelectorAll(".tile")).filter((tile) => {
    return (
      getComputedStyle(tile).getPropertyValue("background-color") !==
      "rgba(0, 0, 0, 0)"
    );
  });
  tiles.forEach((tile) => (tile.style.backgroundColor = `rgba(0, 0, 0, 0)`));
});
