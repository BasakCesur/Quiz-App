const questions = [
    {
        questions : "What is the largest animal in the world?",
        answers : [
           {text : "Shark", correct : false},
           {text : "Blue Whale", correct : true},
           {text : "Elephant", correct : false},
           {text : "Giraffe", correct : false},
        ]
    },
    {
    questions : "Which is the smallest country in the world?",
        answers : [
           {text : "Vatican City", correct : true},
           {text : "England", correct : false},
           {text : "Ireland", correct : false},
           {text : "Sri Lanka", correct : false},
        ]
    },
    {
    questions : "Which is the largest desert in the world?",
        answers : [
           {text : "Gobi", correct : false},
           {text : "Sahra", correct : false},
           {text : "Antartica", correct : true},
           {text : "Kalahari", correct : false},
        ]
    }
    ,
    {
    questions : "Which is the smallest continent in the world?",
        answers : [
           {text : "Asia", correct : false},
           {text : "Australia", correct : true},
           {text : "Arctic", correct : false},
           {text : "Africa", correct : false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =  questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.questions;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();