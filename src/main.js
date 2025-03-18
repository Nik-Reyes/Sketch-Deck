function generateTiles(...numOfTiles) {
  const sketchArea = document.querySelector(".sketch-area");
  for (let i = 0; i < numOfTiles[0]; i++) {
    const row = document.createElement("div");
    row.classList.add("tile-row");
    for (j = 0; j < numOfTiles[0]; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      row.appendChild(tile);
      sketchArea.appendChild(row);
    }
  }
}

generateTiles(64, 5);
