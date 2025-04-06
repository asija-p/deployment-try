let answer = "MONEY";
let tryWord ="";
let letterCount = 5;
let row=0;
let column=0;

function ButtonPress() {

    if (answer.length != tryWord.length) {
        console.log("The words do not have the same length.");
        return;
    }

    for (let i = 0; i < answer.length; i++) {
        const boxId = `r${row}c${i}`;
        const targetBox = document.getElementById(boxId);

        if (tryWord[i] === answer[i]) {
            targetBox.style.backgroundColor = "green";
        } else if (answer.includes(tryWord[i])) {
            targetBox.style.backgroundColor = "yellow";
        } else {
            targetBox.style.backgroundColor = "red";
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
    targetBox.appendChild(text);

}


