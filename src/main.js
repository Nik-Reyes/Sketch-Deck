function generateTiles(...numOfTiles) {
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
}
generateTiles(8, 8);
