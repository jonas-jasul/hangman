let guess = [];
let wordInProgress = null;

let vegetables = [
    'carrot',
    'broccoli',
    'cauliflower',
    'cucumber',
    'tomato',
    'potato',
    'onion',
    'garlic',
    'spinach',
    'lettuce',
    'celery',
    'asparagus',
    'mushroom',
    'peas',
    'zucchini',
    'corn',
    'beetroot',
    'radish',
];

vegetables = vegetables.map(function (item) {
    return item.toUpperCase();
});



let score = 0;
score = localStorage.getItem('score');

let scoreDisplay = document.getElementById('score');

scoreDisplay.innerHTML = score;

function increaseScore(scoreOld) {
    // score = Number(score) + 100;
    score = Number(score);
    score = Number(scoreOld) + score;
    let sec = secondsPassed();
    score = Number(scoreOld) + (100 - (incorrectGuesses * 10) - (sec));
    if (score < scoreOld) {
        score = scoreOld;
    }

    console.log();
    scoreDisplay.innerHTML = score;
    localStorage.setItem('score', score);

}

function resetScore() {
    score = 0;
    scoreDisplay.innerHTML = score;
    localStorage.setItem('score', score);
}
// resetScore();

let [miliseconds, seconds, minutes] = [0, 0, 0];
let stopwatch = document.querySelector('.stopwatch');
let interval = null;


function startStopwatch() {
    interval = setInterval(incrementTime, 10);
}

function secondsPassed() {
    let secondsPassedVar;
    let secondsOnly = Number(stopwatch.innerHTML.split(':')[1]);
    let minutesOnly = Number(stopwatch.innerHTML.split(':')[0]);

    secondsPassedVar = (minutesOnly * 60) + secondsOnly;
    return secondsPassedVar;
}

function incrementTime() {
    miliseconds += 10;
    if (miliseconds == 1000) {
        miliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++
        }
    }
    stopwatch.innerHTML = `${minutes} : ${seconds} : ${miliseconds}`;
    // secondsPassed();
}



startStopwatch();
let wordToGuess = document.getElementById('wordToGuess');

let allowedGuesses = 6;
let incorrectGuesses = 0;
let correctGuesses = 0;
let correctGuessesIndices = [];


let categorySelected = localStorage.getItem('categorySelected');
console.log(categorySelected);
let categoryDisplay = document.getElementById('categoryDisplay');
categoryDisplay.innerHTML = categorySelected;

//alternatyvus budas gauti kategorija is url
var params = new URLSearchParams(window.location.search);
let category = params.get('category');

let difficulty = params.get('difficulty');
console.log(difficulty);


let difficultyDisplay = document.getElementById('difficultyDisplay');
function displayDifficultyGameWindow() {
    difficultyDisplay.innerHTML = difficulty;

    switch (difficulty) {
        case "Easy":
            difficultyDisplay.setAttribute('class', 'easy');
            break;
        case "Medium":
            difficultyDisplay.setAttribute('class', 'medium');
            break;

        case "Hard":
            difficultyDisplay.setAttribute('class', 'hard');
            break;
    }
}

displayDifficultyGameWindow();


let animals = [
    { word: "dog", hint: "woof" },
    { word: "cat", hint: "meow" },
    { word: "mouse", hint: "squeak" },
    { word: "rat", hint: "squeak" },
    { word: "rabbit", hint: "carrots" },
    { word: "hamster", hint: "rodent" },
    { word: "turtle", hint: "shell" },
    { word: "lizard", hint: "scales" },
    { word: "snake", hint: "hiss" },
    { word: "frog", hint: "I'm usually green and slimy" },
    { word: "toad", hint: "I have a dull and warty skin" },
    { word: "fish", hint: "sea" },

];

let countries = [
    { word: "Lithuania", hint: "Vilnius" },
    { word: "Latvia", hint: "Riga" },
    { word: "Estonia", hint: "Tallinn" },
    { word: "Finland", hint: "Helsinki" },
    { word: "Sweden", hint: "Stockholm" },
    { word: "Norway", hint: "Oslo" },
    { word: "Denmark", hint: "Copenhagen" },
    { word: "Iceland", hint: "Reykjavik" },
    { word: "Ireland", hint: "Dublin" },
    { word: "England", hint: "London" },
    { word: "Scotland", hint: "Edinburgh" },
    { word: "Wales", hint: "Cardiff" },
    { word: "France", hint: "Paris" },
    { word: "Spain", hint: "Madrid" },
    { word: "Portugal", hint: "Lisbon" },
    { word: "Italy", hint: "Rome" },
    { word: "Greece", hint: "Athens" },
    { word: "Turkey", hint: "Ankara" },
    { word: "Russia", hint: "Moscow" },
    { word: "Ukraine", hint: "Kiev" },
    { word: "Belarus", hint: "Minsk" },
    { word: "Poland", hint: "Warsaw" },
    { word: "Germany", hint: "Berlin" },
    { word: "Austria", hint: "Vienna" },
    { word: "Switzerland", hint: "Bern" },
    { word: "Netherlands", hint: "Amsterdam" },
    { word: "Belgium", hint: "Brussels" },
    { word: "Luxembourg", hint: "Luxembourg" },
    { word: "Czechia", hint: "Prague" },
    { word: "Slovakia", hint: "Bratislava" },
    { word: "Hungary", hint: "Budapest" },
    { word: "Slovenia", hint: "Ljubljana" },
    { word: "Croatia", hint: "Zagreb" },
    { word: "Serbia", hint: "Belgrade" },
    { word: "Macedonia", hint: "Skopje" },
    { word: "Usa", hint: "Land of Freedom" }
]

let chosenCategoryWordArr = []

function assignWordArrByCategory() {
    switch (categorySelected) {
        case "animals":
            chosenCategoryWordArr = animals;
            break;

        case "countries":
            chosenCategoryWordArr = countries;
            break;
    }
}
assignWordArrByCategory();

//reset word arr storage

// localStorage.setItem("persistentWordArr", JSON.stringify(chosenCategoryWordArr));
let wordArrBefore=chosenCategoryWordArr;
//pavercia zodzius is zodziu objekto i didziasias raides
function arrToUpperCase() {
    Object.keys(chosenCategoryWordArr).forEach(key => {
        chosenCategoryWordArr[key].word = chosenCategoryWordArr[key].word.toUpperCase();
    });

}


function setWordArr() {
    localStorage.setItem("persistentWordArr", JSON.stringify(chosenCategoryWordArr));
}

function getWordArr() {
    chosenCategoryWordArr = JSON.parse(localStorage.getItem("persistentWordArr"));
}

window.onload = function (e) {

    // getWordArr();
    console.log(chosenCategoryWordArr);
}

//TODO add hard difficulty functionality

function chooseWordByCategory() {
    getWordArr();
    let index = chooseRandIndex(chosenCategoryWordArr);
    categorySelected = localStorage.getItem('categorySelected');
    if (categorySelected == 'vegetables') {
        return vegetables[Math.floor(Math.random() * vegetables.length)];
    } else if (categorySelected == 'countries') {
        arrToUpperCase();
        switch (difficulty) {
            case "Easy":
                let valuesEasy = filterEasyDifficulty("countries");
                this.randWord = valuesEasy[0];
                this.hint = valuesEasy[1];
                break;

            case "Medium":
                let valuesMed = filterMediumDifficukty("countries");
                this.randWord = valuesMed[0];
                this.hint = valuesMed[1];
                break;
        }


    } else if (categorySelected == 'animals') {
        arrToUpperCase();
        switch (difficulty) {
            case "Easy":
                let valuesEasy = filterEasyDifficulty("animals");
                chosenCategoryWordArr=valuesEasy;
                index=chooseRandIndex(valuesEasy);
                this.randWord = valuesEasy[index]["word"];
                this.hint = valuesEasy[index]["hint"];
                break;

            case "Medium":
                let valuesMed = filterMediumDifficukty("animals");
                chosenCategoryWordArr = valuesMed;
                index = chooseRandIndex(valuesMed);
                this.randWord = valuesMed[index]["word"];
                this.hint = valuesMed[index]["hint"];
                break;
        }

    }
}

function chooseRandIndex(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return index;
}

// function filterArrayByLength(arrOfObjects, wordLengthLower, wordLengthUpper) {
//     let arr = arrOfObjects.filter(item => item["word"].length >= wordLengthLower && item["word"].length <= wordLengthUpper);
//     // console.log(arr);
//     let index = Math.floor(Math.random() * arr.length);
//     let chosenWord = arr[index].word;
//     let hintForWord = arr[index].hint;
//     return [chosenWord, hintForWord];
// }

function filterArrayByLength(arrOfObjects, wordLengthLower, wordLengthUpper) {
    let arr = arrOfObjects.filter(item => item["word"].length >= wordLengthLower && item["word"].length <= wordLengthUpper);
    return arr;
}


function filterEasyDifficulty(category) {
    switch (category) {
        case "countries":
            let valsCountry = filterArrayByLength(chosenCategoryWordArr, 3, 5);
            // console.log(vals);
            return [valsCountry[0], valsCountry[1]];

        case "animals":
            let valsAnimals = filterArrayByLength(chosenCategoryWordArr, 3, 5);
            return valsAnimals;

    }
}

function filterMediumDifficukty(category) {
    switch (category) {
        case "countries":
            let valsCountry = filterArrayByLength(chosenCategoryWordArr, 4, 6);
            // return [valsCountry[0], valsCountry[1]];
            return valsCountry;

        case "animals":
            let valsAnimal = filterArrayByLength(chosenCategoryWordArr, 4, 6);
            // return [valsAnimal[0], valsAnimal[1]];

            console.log(valsAnimal);
            return valsAnimal;

    }
}
let wordObj = new chooseWordByCategory();
let randWord = wordObj.randWord;
console.log(randWord);

let hintElement = document.getElementById('hint');
hintElement.innerHTML = wordObj.hint;



let answerArray = [];


function drawDashesForWord() {
    for (let i = 0; i < randWord.length; i++) {
        answerArray[i] = '_';
        wordToGuess.innerHTML = answerArray.join(' ');
    }

}
drawDashesForWord();
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
    ctx.arc(150, 30, 10, 0, 2 * Math.PI);
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

            removeGuessedWordFromArr(randWord);
            setWordArr();
            // getWordArr();
            correctGuessScreen();
        }
        else {
            correctGuesses++;
        }
        drawWord();
    }
}

function generateNewWord() {
    let wordObj = new chooseWordByCategory();
    let randWord = wordObj.randWord;

    let hintElement = document.getElementById('hint');
    hintElement.innerHTML = wordObj.hint;

}

function resetPlayWindow() {
    generateNewWord();
    let crrctGuessWindow = document.getElementById("correctGuessScreen");
    if (crrctGuessWindow.style.display === "none") {
        crrctGuessWindow.style.display = "block";
    }
    else {
        crrctGuessWindow.style.display = "none";
    }

    answerArray = [];
    drawDashesForWord();

    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
    }

}

//TODO fix display (remove correct guess screen) when winning
function correctGuessScreen() {
    increaseScore(score);
    // let elementsToRemove = document.getElementsByClassName('hangmanDiv');
    // elementsToRemove[0].parentNode.removeChild(elementsToRemove[0]);

    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }

    let block_to_insert = document.createElement('div');
    block_to_insert.id = 'correctGuessScreen';
    block_to_insert.innerHTML = '<h3>Correct!</h3> <button id="continuePlaying">Continue</button>';
    let container = document.getElementById('container');
    container.appendChild(block_to_insert);

    let continuePlaying = document.getElementById('continuePlaying');

    continuePlaying.addEventListener('click', function () {
        if(chosenCategoryWordArr.length==0) {
            localStorage.setItem("persistentWordArr", JSON.stringify(wordArrBefore));
            winScreen();
        }
        else location.reload();
        // resetPlayWindow();
    });

    clearInterval(interval);

}


function winScreen() {
    let elementsToRemove1 = document.getElementsByClassName('hangmanDiv');
    elementsToRemove1[0].parentNode.removeChild(elementsToRemove1[0]);
    // for (let i = 0; i < btns.length; i++) {
    //     btns[i].disabled = true;
    // }
    let elementsToRemove2 =document.getElementsByClassName("letterButtons");
    elementsToRemove2[0].parentNode.removeChild(elementsToRemove2[0]);

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
    clearInterval(interval);
    

}

let keyboard = document.querySelector('.letterButtons');

function loseScreen() {
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = true;
    }

    let block_to_insert = document.createElement('div');
    block_to_insert.id = 'loseScreen';
    block_to_insert.innerHTML = '<h1>YOU LOSE!</h1> <button id="playAgain">Play Again</button>';
    let container = document.getElementById('container');
    container.appendChild(block_to_insert);

    let playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function () {
        location.reload();
    }
    );
    clearInterval(interval);

    resetScore();

    //hide keyboard
    keyboard.style.display = 'none';


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

// function removeGuessedWordFromArr(category, guessedWord) {
//     switch (category) {
//         case "animals":
//             let animalsArr = chosenCategoryWordArr;
//             animalsArr = animalsArr.filter(element => element.word !== guessedWord);
//             // console.log(animalsArr);
//             return animalsArr;

//         case "countries":
//             let countryArr = chosenCategoryWordArr;
//             countryArr = countryArr.filter(element => element.word !== guessedWord);
//             return countryArr;
//     }
// }

function removeGuessedWordFromArr(guessedWord) {
    let index = chosenCategoryWordArr.map(item => item.word).indexOf(guessedWord);
    console.log(index);
    chosenCategoryWordArr.splice(index, 1);
}
// getWordArr();
