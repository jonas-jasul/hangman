let enterBtn = document.getElementById('enterBtn');

let categories = document.getElementById('category');
let categorySelected = null;

let enterHref = document.getElementById('enterHref');

function handleCategoryClicks(e) {
    const allCategoryImgs = document.querySelectorAll('.specCategDiv');
    allCategoryImgs.forEach(img => img.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    categorySelected = e.currentTarget.getAttribute('data-category');

}
const categoryImgs = document.querySelectorAll('.specCategDiv');
categoryImgs.forEach(img => img.addEventListener('click', handleCategoryClicks));
var params = new URLSearchParams();
var diffParam = new URLSearchParams();
if (enterBtn) {
    enterBtn.addEventListener('click', function () {
        if (categorySelected != null) {
            params.append('categorySelected', categorySelected);

            localStorage.setItem('categorySelected', categorySelected);
            console.log(categorySelected);

            diffParam.append('difficulty', difficultyText.innerHTML);
            //alternatyvus budas perduoti kategorija
            var url = "gameWindow.html?" + params.toString() + "&" + diffParam.toString();
            enterHref.href = url;
        }
        else {
            alert('Please select a category');
        }
    });
}

// let difficultyRange = document.getElementById('difficultyRange');

// difficultyText.innerHTML = 'Medium';
// difficultyRange.onchange = function () {
//     switch (difficultyRange.value) {
//         case '1':
//             difficultyText.innerHTML = 'Easy';
//             break;
//         case '2':
//             difficultyText.innerHTML = 'Medium';
//             break;
//         case '3':
//             difficultyText.innerHTML = 'Hard';
//             break;

//     }
// }

let difficultyCanvas = document.getElementById("difficultyCanvas");
let diffCtx = difficultyCanvas.getContext('2d');

function drawEasyBar() {
    diffCtx.clearRect(0,0,difficultyCanvas.width, difficultyCanvas.height);
    diffCtx.fillStyle = "green";
    diffCtx.fillRect(0, 0, 100, 200);
}
function drawMediumBar() {
    diffCtx.clearRect(0,0,difficultyCanvas.width, difficultyCanvas.height);
    diffCtx.fillStyle = "blue";
    diffCtx.fillRect(0, 0, 200, 200);
}
function drawHardBar() {
    diffCtx.clearRect(0,0,difficultyCanvas.width, difficultyCanvas.height);
    diffCtx.fillStyle = "red";
    diffCtx.fillRect(0, 0, 300, 200);
}

let increaseDiffBtn = document.getElementById('increaseDiffBtn');
let decreaseDiffBtn = document.getElementById('decreaseDiffBtn');
let difficultyText = document.getElementById('difficultyText');

drawMediumBar();
let difficulty = 2;

function drawDifficultyBar(diff) {
    switch (diff) {
        case 1:
            drawEasyBar();
            difficultyText.innerHTML="Easy";
            break;
        case 2:
            drawMediumBar();
            difficultyText.innerHTML="Medium";
            break;
        case 3:
            drawHardBar();
            difficultyText.innerHTML="Hard";
            break;
    }
}
increaseDiffBtn.addEventListener('click', function () {
    if (difficulty < 3) {
        difficulty++;
        drawDifficultyBar(difficulty);
    }
});

decreaseDiffBtn.addEventListener('click', function () {
    if (difficulty > 1) {
        difficulty--;
        drawDifficultyBar(difficulty);
    }
});

// export {categorySelected};