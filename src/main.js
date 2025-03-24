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
        eraseBrush(tile);

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

function resize() {
  const tileList = document.querySelectorAll(".tile-row");
  tileList.forEach((row) => row.remove());
  generateTiles(input.value, input.value);
}

function createModal(message, buttons) {
  //get necessary elements to create a new modal
  //1.Need access to the p tag
  //2. need to implant the buttons into the button-wrapper
  //3. need to show/unhide the warning-modal

  const modal = document.querySelector(".warning-modal");
  const modalMessage = modal.querySelector("p");
  const buttonWrapper = modal.querySelector(".warning-button-wrapper");

  //Create the message
  modalMessage.textContent = message;

  //Create the buttons
  const newButtons = [];
  for (let i = 0; i < buttons.length; i++) {
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "warning-buttons";

    const button = document.createElement("button");
    button.id = buttons[i].id;
    button.className = "choice-button";
    button.innerText = buttons[i].text;

    buttonContainer.appendChild(button);
    newButtons.push(buttonContainer);
  }

  //clear any previous buttons and replace them with the newly created ones
  buttonWrapper.replaceChildren(...newButtons);
  console.log(buttonWrapper);

  //Now that the modal has been created, toggle the hidden class
  modal.classList.toggle("hidden");
}

const inputNotification = (e) => {
  input.toggleAttribute("disabled");
  e.preventDefault();
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      createModal("Warning!\nMust input a value", [{ id: "ok", text: "OK" }]);
    } else if (input.validity.patternMismatch) {
      createModal("Please enter only digits [1-9]", [{ id: "ok", text: "OK" }]);
    }
    return;
  }

  if (input.value > 64 && input.value <= 99) {
    createModal("Ummmmmm, no thats too big of a grid.", [
      { id: "ok", text: "OK" },
    ]);
    return;
  }

  if (input.value >= 100 && input.value <= 249) {
    createModal(
      "Hmmmmm. Ok. You must really want a large grid. Too bad so sad.",
      [{ id: "ok", text: "OK" }]
    );
    return;
  }

  if (input.value >= 250 && input.value <= 499) {
    createModal(
      "Reeeeeaaaaalllllyyyyy??? You really wanna go that big? You sure? You double double sure? I don't think you're sure. Sorry, no big grid for u!",
      [{ id: "ok", text: "OK" }]
    );
    return;
  }

  if (input.value >= 500 && input.value <= 799) {
    createModal(
      "You are out of your mind. This big of a grid would be too large to see an individual tile. No way jose.",
      [{ id: "ok", text: "OK" }]
    );
    return;
  }

  if (input.value >= 800 && input.value <= 998) {
    createModal(
      "You are a bold one! I am almost willing to allow such a large grid. ALMOST! Hah!, better luck next time.",
      [{ id: "ok", text: "OK" }]
    );
    return;
  }

  if (input.value >= 999) {
    createModal(
      "You know what, fine. You can have it. But uhhhh, good luck sketching anything. Let alone even getting your broswer to respond lol.",
      [{ id: "big-grid", text: "Big grid" }]
    );
    return;
  }

  createModal(
    "Warning! Resizing the grid will ERASE your drawing! Would you like to proceed?",
    [
      { id: "cancel", text: "NO" },
      { id: "confirm", text: "YES" },
    ]
  );
};

function toggleCenterTacks() {
  const lights = document.querySelectorAll("#toggle-centers .toggle-bezel");
  lights.forEach((light) => light.classList.toggle("active"));
  const centers = document.querySelectorAll(".center-tile");
  centers.forEach((center) => center.classList.toggle("hidden"));
}

const toggleBorders = () => {
  const lights = document.querySelectorAll("#toggle-borders .toggle-bezel");
  lights.forEach((light) => light.classList.toggle("active"));
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
const warningModal = document.querySelector(".warning-modal");

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

form.addEventListener("submit", inputNotification);
borderButton.addEventListener("click", toggleBorders);
resetButton.addEventListener("click", clearGrid);
centerButton.addEventListener("click", toggleCenterTacks);
blackMode.addEventListener("click", (e) => (brushMode = 0));
shadeMode.addEventListener("click", (e) => (brushMode = 1));
eraseMode.addEventListener("click", (e) => (brushMode = 3));
warningModal.addEventListener("click", (e) => {
  const modalButton = e.target.closest("button");
  if (!modalButton) {
    return;
  }
  if (modalButton.id === "confirm" || modalButton.id === "big-grid") {
    resize();
  }
  warningModal.classList.toggle("hidden");
  input.toggleAttribute("disabled");
});
