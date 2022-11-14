//For the timer
var currentTimer = document.getElementById('timer');
//For the quiz 
var quizLength = 0;
var buttonAnswer = document.getElementById('buttonSubmit');
var buttonStart = document.getElementById('buttonStart');
var questionID = document.getElementById('questionID');
var questionText = document.getElementById('questionText');
var QA = document.getElementById('QA');
var QB = document.getElementById('QB');
var QC = document.getElementById('QC');
var QD = document.getElementById('QD');

function updateTime() {
    var time = currentTimer.dataset.time;
    currentTimer.innerText = time;
}
function setTime(newTime) {
    currentTimer.dataset.time = newTime;
}

//This simplifies my life, so I can change between debugging on GitHub Pages and localhost. I just uncomment what I need
//var url = 'http://127.0.0.1:5500/assets/data/data.json';
var url = 'https://rbarbosa51.github.io/Javascript-Code-Quiz/assets/data/data.json';

//Global Variable pointing to the current question
var currentQuestionID = 0;

function loadQuestions(currentQuestionID) {
    console.log('loadQuestions');
    //Only Works in Local Computer (Live Server) or Github Pages
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        console.log(json.length);
        quizLength = json.length;
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

function startTimer() {
    setInterval(() => {
        var currentTime = currentTimer.dataset.time;
        if (currentTime > 0) {
            setTime(currentTime - 1);
            updateTime();
        } 
        else {
            clearInterval();
        }
    }, 1000);
    
}

//This button starts the game
buttonStart.addEventListener('click', () => {
    console.log('Start Game');
    //This makes the form's display visible
    showQuestions();
    //Goes and gets the json file with the current question
    loadQuestions(currentQuestionID);
    //Starts the timer
    startTimer();

});

//
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    console.log('Button Clicked');
    //Check if correct answer if not punish
    
    //Load the next question if there are any questions left
    //I need to add 1 to compensate for the fact that I have to add 1. 
    if (currentQuestionID + 1 < quizLength) {
        currentQuestionID = currentQuestionID + 1;
        loadQuestions(currentQuestionID);
    } else {
        console.log('No more questions');
    }
    
    
});


window.addEventListener('load', () => {
    updateTime();
});