let answer = "";
let desc = "";

async function getWordAndMeaning() {
    await fetch("https://random-word-api.vercel.app/api?words=1&length=5")
    .then(response => response.json())
    .then(([word]) => {
        answer = word.toUpperCase(); 
    });

    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${answer}`)
    .then(response => response.json())
    .then(([descr]) => {
        desc = descr;  
    });

    console.log(`word: ${answer}`);
    console.log(`meaning: ${desc}`);
}

let tryWord ="";
let letterCount = 5;
let row=0;
let column=0;

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

        const data = await response.json();
        console.log(`"${word}" is a valid word.`);
        return true;
    } catch (err) {
        console.error("Fetch failed:", err);
        return false;
    }
}

async function ButtonPress() {

    if (answer.length != tryWord.length) {
        console.log("The words do not have the same length.");
        return;
    }

    const exists = await WordExists(tryWord);
    if (!exists) {
        console.log("The word does not exist.");
        return;
    }


    let answerChars = [...answer]; 
    let tryWordChars = [...tryWord]; 

    for (let i = 0; i < answer.length; i++) {
        const boxId = `r${row}c${i}`;
        const targetBox = document.getElementById(boxId);

        if (tryWord[i] === answer[i]) {
            targetBox.style.backgroundColor = "rgb(114,221,38)";
            answerChars[i]=null;
            tryWordChars[i]=null;
        }

        if(!answer.includes(tryWord[i]))
        {
            const key = document.getElementById(tryWordChars[i]);
            key.classList.add("wrong-letter");
        }
    }

    for (let i = 0; i < tryWordChars.length; i++) {
        const boxId = `r${row}c${i}`;
        const targetBox = document.getElementById(boxId);

        if (tryWordChars[i] !== null && answerChars.includes(tryWordChars[i])) {
            targetBox.style.backgroundColor = "rgb(248, 215, 50)"; 
            answerChars[answerChars.indexOf(tryWordChars[i])] = null;
        } else if (tryWordChars[i] !== null) {
            targetBox.style.backgroundColor = "rgb(244, 62, 62)";
            
        }
    }

    row++;
    column=0;
    tryWord="";
}

function AddLetter(clicked_id) {
    let x = document.getElementById(clicked_id);
    if (tryWord.length < letterCount) {
        tryWord = tryWord + x.innerHTML;
        AddScreenLetter(x.innerHTML);
        column++;

        console.log(tryWord);
    } else {
        console.log("All letters are added");
    }
}

function DeleteLetter() {
    if (tryWord !== "") {
        console.log("The letter:", tryWord[tryWord.length - 1]);
        tryWord = tryWord.slice(0, -1);
        console.log("After deleting:", tryWord);
        console.log(`Current row n col: r${row}c${column-1}`);
        
        const boxId = `r${row}c${column-1}`;
        const targetBox = document.querySelector(`#${boxId}`);
        
        const p = targetBox.querySelector('p');
        if (p !== null) {
            p.remove(); // Correct way to remove the <p> element
            column--;
        }
    } else {
        console.log("Empty word");
    }
}

function AddScreenLetter(letter)
{
    const boxId = `r${row}c${column}`;
    const targetBox = document.getElementById(boxId);
    const text = document.createElement("p");
    text.textContent=letter;
    
    targetBox.style.backgroundColor = "rgb(234, 234, 234)";
    targetBox.appendChild(text);

}

getWordAndMeaning();


