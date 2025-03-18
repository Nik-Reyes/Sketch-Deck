// rest parameter allows for variable skecth area size (square, portrait, landscape)
const generateTiles = (...numOfTiles) => {
  const sketchArea = document.querySelector(".sketch-area");
  const rowsFrag = document.createDocumentFragment();
  for (let i = 0; i < numOfTiles[0]; i++) {
    const row = document.createElement("div");
    row.classList.add("tile-row");
    for (let j = 0; j < numOfTiles[0]; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
    }
    rowsFrag.appendChild(row);
  }
  sketchArea.appendChild(rowsFrag);
};
generateTiles(8, 8);

const paintTile = (e) => {
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
};
const sketchArea = document.querySelector(".sketch-area");
sketchArea.addEventListener("click", paintTile);
