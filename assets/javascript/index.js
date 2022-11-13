
var buttonAnswer = document.getElementById('buttonSubmit');
var buttonStart = document.getElementById('buttonStart');
var questionID = document.getElementById('questionID');
var questionText = document.getElementById('questionText');
var QA = document.getElementById('QA');
var QB = document.getElementById('QB');
var QC = document.getElementById('QC');
var QD = document.getElementById('QD');

//This simplifies my life, so I can change between debugging on GitHub Pages and localhost. I just uncomment what I need
//var url = 'http://127.0.0.1:5500/assets/data/data.json';
var url = 'https://rbarbosa51.github.io/Javascript-Code-Quiz/assets/data/data.json';

//Global Variable pointing to the current question
var currentQuestionID = 0;
var data = 5;
function loadQuestions(currentQuestionID) {
    //Only Works in Local Computer
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        questionID.innerText = (json[currentQuestionID].id + 1);
        questionText.innerText = json[currentQuestionID].Question;
        QA.innerText = json[currentQuestionID].A;
        QB.innerText = json[currentQuestionID].B;
        QC.innerText = json[currentQuestionID].C;
        QD.innerText = json[currentQuestionID].D;
    });
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
    loadQuestions(currentQuestionID);
    //console.log(data);
});

//
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    console.log('Button Clicked');
});