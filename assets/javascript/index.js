var buttonAnswer = document.getElementById('buttonSubmit');
var buttonStart = document.getElementById('buttonStart');

function showQuestions() {
    var qForm = document.querySelector('form');
    qForm.classList.remove('hidden');
}

//This button starts the game
buttonStart.addEventListener('click', () => {
    console.log('Start Game');
    showQuestions();
});

//
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    console.log('Button Clicked');
});