
var buttonAnswer = document.getElementById('buttonSubmit');
var buttonStart = document.getElementById('buttonStart');

function loadQuestions() {
    //Only Works in Local Computer
    //fetch('http://127.0.0.1:5500/assets/data/data.json').then((response) => response.json()).then((json) => console.log(json));
    //Works in Github Pages
    fetch('https://rbarbosa51.github.io/Javascript-Code-Quiz//assets/data/data.json').then((response) => response.json()).then((json) => console.log(json));
}

function showQuestions() {
    var qForm = document.querySelector('form');
    qForm.classList.remove('hidden');
}

//This button starts the game
buttonStart.addEventListener('click', () => {
    console.log('Start Game');
    showQuestions();
    //console.log(data);
    loadQuestions();
    
});

//
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    console.log('Button Clicked');
});