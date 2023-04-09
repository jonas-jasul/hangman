let enterBtn = document.getElementById('enterBtn');

let categories = document.getElementById('category');
let categorySelected = null;

let enterHref = document.getElementById('enterHref');

function handleCategoryClicks(e) {
    const allCategoryImgs = document.querySelectorAll('.specCategDiv');
    allCategoryImgs.forEach(img => img.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    categorySelected = e.target.getAttribute('data-category');

}
const categoryImgs = document.querySelectorAll('.specCategDiv');
categoryImgs.forEach(img => img.addEventListener('click', handleCategoryClicks));
var params = new URLSearchParams();
if (enterBtn) {
    enterBtn.addEventListener('click', function () {
        if (categorySelected != null) {
            params.append('categorySelected', categorySelected);

            localStorage.setItem('categorySelected', categorySelected);
            console.log(categorySelected);

            //alternatyvus budas perduoti kategorija
            var url = "gameWindow.html?" + params.toString();
            enterHref.href = url;
        }
        else {
            alert('Please select a category');
        }
    });
}



// export {categorySelected};