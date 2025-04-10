import { GameState } from "../data/gameState.js";
import { FreeColumn } from "../utils/utils.js";



async function ButtonPress() {

    if (GameState.answer.length != GameState.tryWord.length) {
        ErrorHandler("The length of the word isn't 5 letters");
        return;
    }
    console.log(GameState.tryWord.join(""));
    const exists = await WordExists(GameState.tryWord.join(""));
    if (!exists) {
        ErrorHandler("The word does not exist");
        return;
    }


    let answerChars = [...GameState.answer];
    let tryWordChars = [...GameState.tryWord];

    for (let i = 0; i < GameState.answer.length; i++) {
        const inputId = `r${GameState.row}c${i}`;
        const targetBox = document.getElementById(inputId);

        if (GameState.tryWord[i] === GameState.answer[i]) {
            targetBox.style.backgroundColor = "rgb(114,221,38)";
            answerChars[i] = null;
            tryWordChars[i] = null;
        }

        if (!GameState.answer.includes(GameState.tryWord[i])) {
            const key = document.getElementById(tryWordChars[i]);
            key.classList.add("wrong-letter");
        }
    }

    for (let i = 0; i < tryWordChars.length; i++) {
        const inputId = `r${GameState.row}c${i}`;
        const targetBox = document.getElementById(inputId);

        if (tryWordChars[i] !== null && answerChars.includes(tryWordChars[i])) {
            targetBox.style.backgroundColor = "rgb(248, 215, 50)";
            answerChars[answerChars.indexOf(tryWordChars[i])] = null;
        } else if (tryWordChars[i] !== null) {
            targetBox.style.backgroundColor = "rgb(244, 62, 62)";

        }
    }

    GameState.row++;
    GameState.column = 0;
    GameState.tryWord = [];
    FreeColumn(GameState.row);
}

export {ButtonPress}