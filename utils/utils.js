import { GameState } from "../data/gameState.js";


function ErrorHandler(errorInfo) {

    const popupContainer = document.querySelector('.popup-container');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closePopup");
    let errorMsg = document.querySelector("#errorText");

    popupContainer.classList.add("show");
    errorMsg.textContent = errorInfo;
    console.log("error");

    clearTimeout(GameState.popupTimeout);

    GameState.popupTimeout = setInterval(() => {
        popupContainer.classList.remove("show");
    }, 1000);

    closeButton.addEventListener("click", () => {
        popupContainer.classList.remove("show");
        clearTimeout(GameState.popupTimeout);
    });
}

function FreeColumn(param = 0) {
    let targetInput;
    for (let i = 0; i < 5; i++) {
        targetInput = document.getElementById(`r${param}c${i}`);
        targetInput.removeAttribute("disabled");
    }
}

function GenerateGrid() {
    let gridContainer = document.querySelector(".grid-container");
    const rows = 6;
    const cols=5;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let InputBox = document.createElement('input');
            InputBox.className="box";
            InputBox.type = "text";
            InputBox.maxLength=1;
            InputBox.value="";
            InputBox.autocomplete="off";
            InputBox.disabled =true;
            InputBox.id=`r${r}c${c}`;
            InputBox.setAttribute('oninput',`handleInput(this.id,this.value)`);
            gridContainer.appendChild(InputBox);
        }
    }
}

export { ErrorHandler, FreeColumn,GenerateGrid };