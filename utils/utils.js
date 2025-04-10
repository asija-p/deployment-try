import { ResetGame } from "../core/uiHandler.js";
import { GameState } from "../data/gameState.js";


function ErrorHandler(errorInfo) {

    const popupContainer = document.getElementById('errorPopupContainer');
    const popup = document.getElementById("popup");
    let errorMsg = document.querySelector("#errorText");

    popupContainer.classList.add("show");
    errorMsg.textContent = errorInfo;
    console.log("error");

    clearTimeout(GameState.popupTimeout);

    GameState.popupTimeout = setInterval(() => {
        popupContainer.classList.remove("show");
    }, 1000);
}

function EndHandler(endInfo) {

    const popupContainer = document.getElementById('endPopupContainer');
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("closeEndPopup");
    let endMsg = document.querySelector("#endText");
    let desc = document.getElementById("descText");
    let ans = document.getElementById("answerText");
    let resetButton = document.getElementById("playAgain");

    popupContainer.classList.add("show");
    endMsg.textContent = endInfo;
    ans.textContent = `${GameState.answer}`;
    desc.textContent = `Meaning: ${GameState.desc}`
    console.log("end");

    closeButton.addEventListener("click", () => {
        popupContainer.classList.remove("show");
    });

    resetButton.addEventListener("click", () => {
        ResetGame();
        popupContainer.classList.remove("show");
    });
}

function FreeColumn(param = 0) {
    let targetInput;
    let FocusFirst;
    for (let i = 0; i < 5; i++) {
        targetInput = document.getElementById(`r${param}c${i}`);
        FocusFirst = document.getElementById(`r${param}c${0}`);
        if (targetInput) {
            targetInput.removeAttribute("disabled");
        } else {
            console.warn(`Input element r${param}c${i} not found`);
        }
        if(i==0){
            console.log("EVOOO MEEE FOCUS MEEE");
            setTimeout(() => {
                FocusFirst.focus();
            }, 0);
        }
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

function ClearGrid()
{
    let gridContainer = document.querySelector(".grid-container");
    const rows = 6;
    const cols=5;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellId = `r${r}c${c}`;
            const cell = document.getElementById(cellId);

            if (cell) {
                const cellColor = cell.style.backgroundColor;
                const cellValue = cell.value;

                if (cellColor === "rgb(244, 62, 62)" && cellValue) {
                    const keyBtn = document.getElementById(cellValue.toUpperCase());

                    if (keyBtn) 
                        {
                            keyBtn.classList.remove("wrong-letter");
                        }
                 
                }

                cell.value = "";
                cell.style.backgroundColor = "rgb(255, 255, 255)"; 
            }
        }
    }
}

export { ErrorHandler, EndHandler, FreeColumn, GenerateGrid, ClearGrid };