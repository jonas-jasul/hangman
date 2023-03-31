
const words = [
    'BAD',
    'DAD',
    'DAB',
    'DECADE',
    'SICK',
    'LIT'
]
let guess = [];
let wordInProgress = null;


let wordToGuess = document.getElementById('wordToGuess');

let allowedGuesses = 6;
let incorrectGuesses = 0;
let correctGuesses = 0;
let correctGuessesIndices = [];

const randWord = words[Math.floor((Math.random() * words.length))];

const hints = [
    'A person who is not good',
    'A parent',
    'A move in dance',
    'A period of 10 years',
    'Not healthy',
    'Cool'
]

let hint = document.getElementById('hint');
hint.innerHTML = hints[words.indexOf(randWord)];


const answerArray = [];

for (let i = 0; i < randWord.length; i++) {
    answerArray[i] = '_';
    wordToGuess.innerHTML = answerArray.join(' ');
}


let remainingLetters = randWord.length;

let A = document.getElementById('A');
let B = document.getElementById('B');
let C = document.getElementById('C');
let D = document.getElementById('D');
let E = document.getElementById('E');
let F = document.getElementById('F');
let G = document.getElementById('G');
let H = document.getElementById('H');
let I = document.getElementById('I');
let J = document.getElementById('J');
let K = document.getElementById('K');
let L = document.getElementById('L');
let M = document.getElementById('M');
let N = document.getElementById('N');
let O = document.getElementById('O');
let P = document.getElementById('P');
let Q = document.getElementById('Q');
let R = document.getElementById('R');
let S = document.getElementById('S');
let T = document.getElementById('T');
let U = document.getElementById('U');
let V = document.getElementById('V');
let W = document.getElementById('W');
let X = document.getElementById('X');
let Y = document.getElementById('Y');
let Z = document.getElementById('Z');


let letters = [
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z
];

var btns = document.getElementsByClassName('keyboardBtn');
for (let i = 0; i < letters.length; i++) {
    btns[i].addEventListener('click', function () {
        keyPress(btns[i].innerHTML);
        btns[i].disabled = true;
    });
}


var canvas = document.getElementById('canvas');
canvas.height = 165

function drawGallows() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(82, 150);
    ctx.lineTo(170, 150);
    ctx.lineTo(100, 150);
    ctx.lineTo(100, 10);
    ctx.lineTo(150, 10);
    ctx.lineTo(150, 20);
    ctx.lineWidth = 1.5;
    ctx.stroke();
   
}

drawGallows();

function drawHead() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(150,30, 10, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawBody() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 41);
    ctx.lineTo(150, 100);
    ctx.stroke();
}

function drawLeftArm() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 60);
    ctx.lineTo(130, 68);
    ctx.stroke();
}
function drawRightArm() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 60);
    ctx.lineTo(170, 68);
    ctx.stroke();
}

function drawLeftLeg() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(130, 110);
    ctx.stroke();
}
function drawRightLeg() {
    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(150, 100);
    ctx.lineTo(171, 110);
    ctx.stroke();
}


function drawHangman() {
    if (incorrectGuesses > 0) {

        if (incorrectGuesses === 1) {
            drawHead();
        }
        else if (incorrectGuesses === 2) {
            drawBody();
        }
        else if (incorrectGuesses === 3) {
            drawLeftArm();
        }
        else if (incorrectGuesses === 4) {
            drawRightArm();
        }
        else if (incorrectGuesses === 5) {
            drawLeftLeg();
        }
        else if (incorrectGuesses === 6) {
            drawRightLeg();
        }
        console.log(incorrectGuesses);
    }
}



function keyPress(letter) {

    if (guess.indexOf(letter) === -1) {
        guess.push(letter);
        if (randWord.indexOf(letter) === -1) {
            incorrectGuesses++;
            drawHangman();
            if (incorrectGuesses === 6) {
                loseScreen();
            }
        }
        else {
            for (let i = 0; i < randWord.length; i++) {
                if (randWord[i] === letter) {
                    correctGuessesIndices.push(i);
                    remainingLetters--;

                }
            }
        }
        if (remainingLetters === 0) {
            winScreen();
        }
        else {
            correctGuesses++;
        }
        drawWord();
    }
}
function winScreen() {
    let elementsToRemove = document.getElementsByClassName('hangmanDiv');
    elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }
    let block_to_insert = document.createElement('div');
    block_to_insert.id = 'winScreen';
    block_to_insert.innerHTML = '<h1>YOU WIN!</h1> <button id="playAgain">Play Again</button>';
    let container = document.getElementById('container');
    container.appendChild(block_to_insert);

    let playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function () {
        location.reload();
    }
    );



}


function loseScreen() {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }

    let block_to_insert = document.createElement('div');
    block_to_insert.id='loseScreen';
    block_to_insert.innerHTML='<h1>YOU LOSE!</h1> <button id="playAgain">Play Again</button>';
    let container = document.getElementById('container');
    container.appendChild(block_to_insert);

    let playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function () {
        location.reload();
    }
    );

}

function drawWord() {
    let answerArray = [];
    for (let i = 0; i < randWord.length; i++) {
        if (correctGuessesIndices.indexOf(i) !== -1) {
            answerArray[i] = randWord[i];
        }
        else {
            answerArray[i] = '_';
        }
    }
    wordToGuess.innerHTML = answerArray.join(' ');

}
