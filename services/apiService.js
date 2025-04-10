import { GameState } from "../data/gameState.js";


async function WordExists(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);

        if (response.status === 404) {
            console.log(`"${word}" is NOT a valid word.`);
            return false;
        }

        if (!response.ok) {
            console.error("Error fetching word data.");
            return false;
        }

        //const data = await response.json();
        console.log(`"${word}" is a valid word.`);
        return true;
    } catch (err) {
        console.error("Fetch failed:", err);
        return false;
    }
}

async function GetWord() {
    await fetch("https://random-word-api.vercel.app/api?words=1&length=5")
        .then(response => response.json())
        .then(([word]) => {
            GameState.answer = word.toUpperCase();
        });
    if (GameState.answer === "" || GameState.answer === "yo-yo") {
        console.log("The word wasn't allowed");
        GetWord();
        return;
    }
    console.log(`word: ${GameState.answer}`);
    getMeaning();
};

async function getMeaning() {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${GameState.answer}`)
        .then(response => response.json())
        .then(([descr]) => {
            GameState.desc = descr.meanings[0].definitions[0].definition;
        });
    console.log(`meaning: ${GameState.desc}`);
}

export { WordExists, GetWord, getMeaning };