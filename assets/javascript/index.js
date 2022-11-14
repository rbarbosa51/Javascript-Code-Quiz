//Initial Time
var initialTime = 100;
//Value to punish
var timePunishment = 5;
//scoreIncreate

// Current questions answer
var currentQuestionAnswer;
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
var url = 'http://127.0.0.1:5500/assets/data/data.json';
//var url = 'https://rbarbosa51.github.io/Javascript-Code-Quiz/assets/data/data.json';

//Global Variable pointing to the current question
var currentQuestionID = 0;

function loadQuestions(currentQuestionID) {
    //Only Works in Local Computer (Live Server) or Github Pages
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        quizLength = json.length;
        questionID.innerText = (json[currentQuestionID].id + 1);
        questionText.innerText = json[currentQuestionID].Question;
        QA.innerText = json[currentQuestionID].A;
        QB.innerText = json[currentQuestionID].B;
        QC.innerText = json[currentQuestionID].C;
        QD.innerText = json[currentQuestionID].D;
        currentQuestionAnswer = json[currentQuestionID].CorrectAnswer;
    }).catch();
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
function getUserInputAnswer() {
    var radioSelect = document.querySelectorAll('input[name="radioSelect"]');
    for (const radio of radioSelect) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

//
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    //Check if correct answer if not punish
    var inputAnswer = getUserInputAnswer();
    console.log(`user Input: ${inputAnswer} and the question correct answer is ${currentQuestionAnswer}`);
    var feedback = document.getElementById('feedback');
    if (inputAnswer === currentQuestionAnswer) {
        feedback.innerText = 'Correct !!!';
    } else {
        feedback.innerText = 'Incorrect !!!';
    }
    //Load the next question if there are any questions left
    //I need to add 1 to compensate for the fact that I have to add 1. 
    currentQuestionID = currentQuestionID + 1;
    
    if (currentQuestionID < quizLength) {
        loadQuestions(currentQuestionID);
    } else {
        //End Game
        console.log('No more questions. Resetting');
        currentQuestionID = 0;
        loadQuestions(currentQuestionID);
    }
    
    
});


window.addEventListener('load', () => {
    setTime(initialTime);
    updateTime();
});