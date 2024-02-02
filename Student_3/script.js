const startButton = document.querySelector('.start-button');
const quizInfo = document.querySelector('.quiz-info');
const extButton = document.querySelector('.ext-button');
const main = document.querySelector('.main');
const contButton = document.querySelector('.cont-button');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainButton = document.querySelector('.tryAgain-button');
const goHomeButton = document.querySelector('.goHome-button');
const countdownTimer = document.getElementById('countdown');
let timeLeft = 90; // Set the time limit here (in seconds)




startButton.onclick = () =>{
    quizInfo.classList.add('active');  
    main.classList.add('active'); 
    startTimer();
}

extButton.onclick = () =>{
    quizInfo.classList.remove('active');   
    main.classList.remove('active'); 
}

contButton.onclick = () =>{
    quizSection.classList.add('active');
    quizInfo.classList.remove('active');   
    main.classList.remove('active');    
    quizBox.classList.add('active');

    showQuestion(0);
    questionCounter(1);
    headerScore();
}

tryAgainButton.onclick = () =>{
    quizBox.classList.add('active');
    nextButton.classList.remove('active');
    resultBox.classList.remove('active');
    timeLeft=90;


    questionCount = 0;
    questionNumb = 1;
    userScore =0;
    showQuestion(questionCount);
    questionCounter(questionNumb);

    headerScore();
}

goHomeButton.onclick = () =>{
    quizSection.classList.remove('active');
    nextButton.classList.remove('active');
    resultBox.classList.remove('active');

    questionCount = 0;
    questionNumb = 1;
    userScore =0;
    showQuestion(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb = 1;
let userScore =0;

const nextButton = document.querySelector('.next-button');

nextButton.onclick = () =>{
    if(questionCount < question.length - 1){
        questionCount++;
        showQuestion(questionCount);

        questionNumb++;
        questionCounter(questionNumb);
        nextButton.classList.remove('active');
    }
    else{
        showResultBox();
    }
    
}

const optionList = document.querySelector('.option-list')
// getting questions and option on array

function showQuestion(index){
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${question[index].number}. ${question[index].question}`;

    let optionTag = `<div class="option"><span>${question[index].Options[0]}</span></div>
        <div class="option"><span>${question[index].Options[1]}</span></div>
        <div class="option"><span>${question[index].Options[2]}</span></div>
        <div class="option"><span>${question[index].Options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = question[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer){
        answer.classList.add('correct');
        userScore +=1;
        headerScore();
    }
    else{
        answer.classList.add('incorrect');

        //if answer incorrect auto seleted correct answer 
        for (let i = 0; i < allOptions; i++){
            if (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class','option correct');
            }
            
        }

    }
    // if user has selected, disable all the options

    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
    }

    nextButton.classList.add('active');
    
}

function questionCounter(index){
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${question.length} Questions`;
}

function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${question.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${question.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / question.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg , rgba(255,255,255,.1)0deg)`;
        if (progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);

}
function startTimer() {
    countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            countdownTimer.textContent = timeLeft;
        } else {
            clearInterval(countdownInterval);
            showResultBox(); // Call this function when the timer runs out
        }
    }, 1000);
}