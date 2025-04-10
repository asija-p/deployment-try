import { GameState } from "../data/gameState.js";

function handleInput(input_id, input_value) {
    let targetInput;
    if (input_value !== "") {
        if (GameState.tryWord[input_id[3]] === undefined) {
            targetInput = document.getElementById(input_id);
            targetInput.style.backgroundColor = "rgb(234, 234, 234)";
            GameState.tryWord.push(input_value.toUpperCase());
            GameState.column++;
        }
        else{
            GameState.tryWord.pop();
            GameState.tryWord.push(input_value.toUpperCase());
        }
        console.log("Added from handleInput(): " + GameState.tryWord.join(""));
        if (GameState.column < 5) {
            targetInput = document.getElementById(`r${GameState.row}c${GameState.column}`);
            console.log(`r${GameState.row}c${GameState.column + 1}`);
            targetInput.focus();
        }
    }
    return;
}

function AddLetter(clicked_id, input_value) {

    let x = document.getElementById(clicked_id);
    if (GameState.tryWord.length < GameState.letterCount) {
        GameState.tryWord.push(x.innerHTML);
        AddScreenLetter(x.innerHTML);
        GameState.column++;

        console.log("Added from AddLetter(): " + GameState.tryWord);
    } else {
        console.log("All letters are added");
    }
}

function DeleteLetter() {
    if (GameState.tryWord.length > 0) {
        console.log("The letter:", GameState.tryWord[GameState.tryWord.length - 1]);
        GameState.tryWord.pop();
        console.log("After deleting:", GameState.tryWord);
        console.log(`Current row n col: r${GameState.row}c${GameState.column - 1}`);

        const inputId = `r${GameState.row}c${GameState.column - 1}`;
        const targetInput = document.querySelector(`#${inputId}`);

        if (targetInput.value !== "") {
            targetInput.value = "" // Correct way to remove the <p> element
            GameState.column--;
        }
    } else {
        console.log("Empty word");
    }
}

function AddScreenLetter(letter) {
    const inputId = `r${GameState.row}c${GameState.column}`;
    const targetInput = document.getElementById(inputId);
    targetInput.value += letter;
    targetInput.style.backgroundColor = "rgb(234, 234, 234)";
}

export { handleInput, AddScreenLetter, DeleteLetter, AddLetter };
