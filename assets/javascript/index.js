//Current Player Score
var currentPlayerScore = 0;
//Initial Time
var initialTime = 100;
//Value to punish
var timePunishment = 5;
//scoreIncreate
var correctScoreIncrease = 3;
var user = {
    name: "",
    score: 0
};
//Timer Interval
var timerInterval;
// Current questions answer
var currentQuestionAnswer;
//Answer Feedback
var feedback = document.getElementById('feedback');
var score = document.getElementById('score');
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
//Entering data
var enterScoreBtn = document.getElementById('enterScoreBtn');
var userName = document.getElementById('userName');

//For the HighScore
var scoreShow = document.getElementById('scoreShow');
var scoreButton = document.getElementById('scoreButton');

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
    }).catch((e) => {
        console.log(`This is the error: ${e}`);
    });
}
//showQuestions and hideQuestions just hides the questions
function showQuestions() {
    var qForm = document.getElementById('formQuiz');
    qForm.classList.remove('hidden');
}
function hideQuestions() {
    var qForm = document.getElementById('formQuiz');
    qForm.classList.add('hidden');
}

/*This function controls the timer. If a game ends because the timer ran out it needs to reset 
just like it would have if the user answered all questions*/
function startTimer() {
    timerInterval = setInterval(() => {
        var currentTime = currentTimer.dataset.time;
        if (currentTime > 0) {
            setTime(currentTime - 1);
            updateTime();
        } 
        else {
            //Time runs out
            clearInterval();
            inputUserScore();
            showScoreDiv();
            currentPlayerScore = 0;
            resettingGame();
        }
    }, 1000);
    
}

//This button starts the game. It also calls the startTimer() function. It resets the user score.
buttonStart.addEventListener('click', () => {
    console.log('Start Game');
    //This makes the form's display visible
    showQuestions();
    //Goes and gets the json file with the current question
    loadQuestions(currentQuestionID);
    //Starts the timer
    startTimer();
    currentPlayerScore = 0;
    score.innerText = `Current Score is: ${currentPlayerScore}`;

});
//This function gets the selected radio button and returns the answer. It also unchecks the radio button.
function getUserInputAnswer() {
    var radioSelect = document.querySelectorAll('input[name="radioSelect"]');
    var answer;
    for (const radio of radioSelect) {
        if (radio.checked) {
            answer = radio.value;
            radio.checked = false;
        }
    }
    return answer;
}
//When the button is clicked it stores the name and score to the localStorage.
enterScoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(userName.value);
    user.name = userName.value;
    user.score = currentPlayerScore;
    localStorage.setItem('User', JSON.stringify(user));
    formEnterScore.classList.add('hidden');
    showScoreDiv();
    
});
//Makes the score component visible as well as set the game's final score
function inputUserScore() {
    var finalScore = document.getElementById('finalScore');
    finalScore.innerText = `The final score was: ${currentPlayerScore}`;
    var formEnterScore = document.getElementById('formEnterScore');
    formEnterScore.classList.remove('hidden');
}

//This is needed to reset (recycle) the game. Allows continual play
function resettingGame() {
    console.log('No more questions. Resetting');
    currentQuestionID = 0;
    loadQuestions(currentQuestionID);
    hideQuestions();
    setTime(initialTime);
    updateTime();
    clearInterval(timerInterval);
    feedback.innerText = '';
    //score.innerText = `Current Score is: ${currentPlayerScore}`;
}

/* In the questions form the button must be prevented from default. It also has to check if the user answer is correct.
It punishes bad behavior*/
buttonAnswer.addEventListener('click',  (e) => {
    e.preventDefault();
    //Check if correct answer if not punish
    var inputAnswer = getUserInputAnswer();
    console.log(`user Input: ${inputAnswer} and the question correct answer is ${currentQuestionAnswer}`);
    //currentPlayerScore    correctScoreIncrease 
    if (inputAnswer === currentQuestionAnswer) {
        feedback.innerText = 'Correct !!!';
        currentPlayerScore += correctScoreIncrease;
        score.innerText = `Current Score is: ${currentPlayerScore}`;
    } else {
        feedback.innerText = `Incorrect - Punished ${timePunishment} seconds!`;
        var currentTime = currentTimer.dataset.time;
        if (currentTime >= timePunishment) {
            currentTime = currentTime - timePunishment;
            setTime(currentTime);
            updateTime();
        } else {
            setTime(0);
            updateTime()
        }
    }
    //Load the next question if there are any questions left
    //I need to add 1 to compensate for the fact that I have to add 1. 
    currentQuestionID = currentQuestionID + 1;
    
    if (currentQuestionID < quizLength) {
        loadQuestions(currentQuestionID);
    } else {
        // Ask for user Name
        inputUserScore();
        //showScoreDiv();
        //End Game
        resettingGame();
    }
    
    
});

//Once the window is loaded it sets the timer to the selected start time
window.addEventListener('load', () => {
    setTime(initialTime);
    updateTime();
});
//This shows the highScore component
function showScoreDiv() {
    var highScore = document.getElementById('highScore');
    highScore.classList.remove('hidden');
    var storedValues = document.getElementById('storedValues');
    var tempName =  JSON.parse(localStorage.getItem('User')).name;
    var tempScore = JSON.parse(localStorage.getItem('User')).score;
    storedValues.innerText = `Name: ${tempName} and Score: ${tempScore}`;
}
//Makes the highScore component visible
scoreShow.addEventListener('click', () => {
    showScoreDiv();
    

});
//Hides the highScore element
scoreButton.addEventListener('click', () => {
    var highScore = document.getElementById('highScore');
    highScore.classList.add('hidden');
    console.log('scoreButton');
})