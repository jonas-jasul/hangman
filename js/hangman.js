let guess = [];
let wordInProgress = null;


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
    { word: "rat", hint: "sewers" },
    { word: "rabbit", hint: "carrots" },
    { word: "hamster", hint: "pet rodent" },
    { word: "turtle", hint: "shell" },
    { word: "lizard", hint: "scales" },
    { word: "snake", hint: "hiss" },
    { word: "frog", hint: "I'm usually green and slimy" },
    { word: "toad", hint: "I have a dull and warty skin" },
    { word: "fish", hint: "sea" },
    { word: "giraffe", hint: "tall neck"},
    { word: "zebra", hint: "black and white"},
    { word: "lion", hint: "pride"},
    { word: "crocodile", hint: "swamp, scales, big teeth"},
    { word: "bird", hint: "fly, wings"}, 
    { word: "ant", hint: "tiny, lives in hills"},

];

let countries = [
    { word: "Lithuania", hint: "Largest and most populous Baltic country" },
    { word: "Latvia", hint: "A country in between two other Baltic countries" },
    { word: "Estonia", hint: "Northernmost Baltic country" },
    { word: "Finland", hint: "Happiest country in the world" },
    { word: "Sweden", hint: "Where PewDiePie is from" },
    { word: "Norway", hint: "Oslo" },
    { word: "Denmark", hint: "Second happiest country in the world" },
    { word: "Iceland", hint: "Island + ice" },
    { word: "Ireland", hint: "Dublin" },
    { word: "England", hint: "People here like to drink tea" },
    { word: "France", hint: "Eiffel tower" },
    { word: "Spain", hint: "European country where people really like football" },
    { word: "Russia", hint: "Largest country in the world"},
    { word: "Portugal", hint: "Westernmost country in Europe" },
    { word: "Italy", hint: "Pizza tower" },
    { word: "Greece", hint: "Where certain ancient myths and legends come from" },
    { word: "Ukraine", hint: "Rhymes with 'crane'" },
    { word: "Poland", hint: "A large country in Eastern Europe" },
    { word: "Germany", hint: "European country famous for its cars" },
    { word: "Austria", hint: "Vienna" },
    { word: "Switzerland", hint: "European country famous for its mountains" },
    { word: "Netherlands", hint: "European country where marijuana is legal" },
    { word: "Belgium", hint: "Famous for its delicious chocolate" },
    { word: "Luxembourg", hint: "Its capital is the same word as the country itself" },
    { word: "Czechia", hint: "Prague" },
    { word: "Scotland", hint: "Men wearing skirts"},
    { word: "Hungary", hint: "Rhymes with 'hungry" },
]

let chosenCategoryWordArr = [];


function assignWordArrByCategory() {
    switch (categorySelected) {
        case "animals":
            return animals;

        case "countries":
            return countries

    }
}

chosenCategoryWordArr = getArrayBasedOnDiffAndCateg(difficulty, categorySelected);

//reset word arr storage

// localStorage.setItem("persistentWordArr", JSON.stringify(chosenCategoryWordArr));
let backupArray = [];

function getWordArr() {
    chosenCategoryWordArr = JSON.parse(localStorage.getItem("persistentWordArr"));

}
function setWordArr() {
    localStorage.setItem("persistentWordArr", JSON.stringify(chosenCategoryWordArr));
}

function arrToUpperCase() {
    Object.keys(chosenCategoryWordArr).forEach(key => {
        chosenCategoryWordArr[key].word = chosenCategoryWordArr[key].word.toUpperCase();
    });

}
window.onload = function (e) {
    localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));


}
function getArrayBasedOnDiffAndCateg(diffic, categ) {

    if (categ === 'animals') {
        arrToUpperCase();
        switch (diffic) {
            case "Easy":
                let valuesEasy = filterEasyDifficulty("animals");
                return valuesEasy;

            case "Medium":
                let valuesMed = filterMediumDifficukty("animals");
                return valuesMed;

            case "Hard":
                let valuesHard = filterHardDifficulty("animals");
                return valuesHard;

        }
    }

    else if (categ === 'countries') {
        arrToUpperCase();
        switch (diffic) {
            case "Easy":
                let valuesEasy = filterEasyDifficulty("countries");
                return valuesEasy;

            case "Medium":
                let valuesMed = filterMediumDifficukty("countries");
                return valuesMed;

            case "Hard":
                let valuesHard = filterHardDifficulty("countries");
                return valuesHard;
        }
    }
}
let usedWords = [];
let index;



function chooseWordByCategory() {

    categorySelected = localStorage.getItem('categorySelected');
    if (categorySelected == 'countries') {
        if (localStorage.getItem("chosenCategoryWordArr")) {
            chosenCategoryWordArr = JSON.parse(localStorage.getItem("chosenCategoryWordArr"));
        } else {
            localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));
        }

        if (chosenCategoryWordArr.length === 0) {
            chosenCategoryWordArr = getArrayBasedOnDiffAndCateg(difficulty, categorySelected);
            localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));
            winScreen();
        }


        switch (difficulty) {
            case "Easy":
                //let valuesEasy = filterEasyDifficulty("countries");
                //chosenCategoryWordArr = valuesEasy;
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;

            case "Medium":
                //let valuesMed = filterMediumDifficukty("countries");
                //chosenCategoryWordArr = valuesMed;
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;

            case "Hard":
                //let valuesHard = filterHardDifficulty("countries");
                // chosenCategoryWordArr = valuesHard;
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;
        }


    } else if (categorySelected == 'animals') {


        if (localStorage.getItem("chosenCategoryWordArr")) {
            chosenCategoryWordArr = JSON.parse(localStorage.getItem("chosenCategoryWordArr"));
        } else {
            localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));
        }

        if (chosenCategoryWordArr.length === 0) {
            chosenCategoryWordArr = getArrayBasedOnDiffAndCateg(difficulty, categorySelected);
            localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));
            winScreen();
        }


        switch (difficulty) {
            case "Easy":
                //let valuesEasy = filterEasyDifficulty("animals");
                // chosenCategoryWordArr = getArrayBasedOnDiffAndCateg(difficulty, categorySelected);
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;

            case "Medium":
                //let valuesMed = filterMediumDifficukty("animals");
                // chosenCategoryWordArr = valuesMed;
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;

            case "Hard":
                arrToUpperCase();
                index = chooseRandIndex(chosenCategoryWordArr);
                this.randWord = chosenCategoryWordArr[index]["word"];
                this.hint = chosenCategoryWordArr[index]["hint"];
                break;
        }

    }


}

function chooseRandIndex(arr) {
    let index = Math.floor(Math.random() * arr.length);
    return index;
}


function filterArrayByLength(arrOfObjects, wordLengthLower, wordLengthUpper) {
    let arr = arrOfObjects.filter(item => item["word"].length >= wordLengthLower && item["word"].length <= wordLengthUpper);
    return arr;
}
function filterEasyDifficulty(category) {
    switch (category) {
        case "countries":
            let valsCountry = filterArrayByLength(countries, 3, 5);
            return valsCountry;

        case "animals":
            let valsAnimals = filterArrayByLength(animals, 3, 5);
            return valsAnimals;

    }
}

function filterMediumDifficukty(category) {
    switch (category) {
        case "countries":
            let valsCountry = filterArrayByLength(countries, 4, 6);
            // return [valsCountry[0], valsCountry[1]];
            return valsCountry;

        case "animals":
            let valsAnimal = filterArrayByLength(animals, 4, 6);
            // return [valsAnimal[0], valsAnimal[1]];
            return valsAnimal;

    }
}

function filterHardDifficulty(category) {
    switch (category) {
        case "countries":
            let valsCountry = filterArrayByLength(countries, 6, 13);
            return valsCountry;

        case "animals":
            let valsAnimals = filterArrayByLength(animals, 5, 12);
            return valsAnimals;
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
            //  chosenCategoryWordArr.splice(index, 1);
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
    randWord = wordObj.randWord;

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
let keyboard = document.querySelector('.letterButtons');

function correctGuessScreen() {
    keyboard.style.display = "none";

    increaseScore(score);

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
        if (chosenCategoryWordArr.length === 0) {
            // winScreen();
        }
        else {
            chosenCategoryWordArr.splice(index, 1);
            localStorage.setItem("chosenCategoryWordArr", JSON.stringify(chosenCategoryWordArr));
            location.reload();
        }
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
    let elementsToRemove2 = document.getElementsByClassName("letterButtons");
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
    localStorage.removeItem("persistentWordArr");
    wordObj = new chooseWordByCategory();
    chosenCategoryWordArr = getArrayBasedOnDiffAndCateg(difficulty, categorySelected);
    resetPlayWindow();


}


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