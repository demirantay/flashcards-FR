/*
    Game 2000 words
*/

/* -----------------------  Data Stuctures ------------------------------- */
let PROGRESS_BAR = document.getElementById("progress-bar");
let PROGRESS_STATUS = document.getElementById("progress-status");
let GAME_LIVES = 3;

// DOM Sounds
let check_success_audio = new Audio("../audio-dom/check-success-sound.wav");
let check_error_audio = new Audio("../audio-dom/check-error-sound-2.wav");

// DOM Elements
let QUESTION_BOX = document.getElementById("question_box");
let ANSWER_BOX_1 = document.getElementById("answer_1");
let ANSWER_BOX_2 = document.getElementById("answer_2");
let ANSWER_BOX_3 = document.getElementById("answer_3");
let ANSWER_BOX_4 = document.getElementById("answer_4");
let CHECK_BOX = document.getElementById("check-button");
let NEXT_BUTTON = document.getElementById("next-button");
let CURRENT_SCORE = document.getElementById("current_score");

// O(1) - lightning fast (miliseconds - for 1m recods)
function fisherYatesShuffle(arr) {
    let n = arr.length;
    for (let i = n - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        let j = Math.floor(Math.random() * (i + 1));
        // Swap elements arr[i] and arr[j]
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Vocab Pack (for generating questions)
let vocab_pack = [
    ["Un|Une", " A/An/One", "1.mp3"],
    ["à", "to", "2.mp3"],
    ["En", "In/By", "3.mp3"],
    ["Le|La", "The", "4.mp3"],
    ["Et", "And", "5.mp3"],
    ["Être", "To be", "6.mp3"],
    ["De", "From", "7.mp3"],
    ["Avoir", "To have", "8.mp3"],
    ["Que", "That/Who/Whom", "9.mp3"],
    ["Ne", "Not", "10.mp3"],
 ];

 // generate the QUIZ DS and it's questions
fisherYatesShuffle(vocab_pack);
let quiz = [];

vocab_pack.forEach(function(item) {
    let rand_indx_1 = Math.floor(Math.random() * vocab_pack.length);
    let rand_indx_2 = Math.floor(Math.random() * vocab_pack.length);
    let rand_indx_3 = Math.floor(Math.random() * vocab_pack.length);
    let question = {
        question: item[0],
        answers: fisherYatesShuffle([item[1], vocab_pack[rand_indx_1][1], vocab_pack[rand_indx_2][1], vocab_pack[rand_indx_3][1]]),
        correctAnswer: item[1],
        audio: item[2]
    };
    quiz.push(question);
});

/* ----------------------------  Algorithms ------------------------------- */
function check_answer(answer) {
    if (answer == "question_answer") {
        // correct sound pop
        // turn green dopamine colors
        // correct answers +1
        // progress bar update
        // remove the known word from list
        // continue to new word
    } else if (answer != "question_answer") {
        // lives -1
        // if lives == 0 -> 
        // quit the game & if current score bigger than PR, update it.
    }
}

function quit_game() {
    // quit the game & if current score bigger than PR, update it.
}

/* ---------------------------- MAIN GAME -------------------------------- */
// event drriven instead of while loops, for performance and scalability

let current_question_index = 0;
let selected_answer = null;


// displayQuestion(): 
// Manages the display of questions and answers.
function displayQuestion() {
    if (current_question_index >= quiz.length) {
        alert("Quiz complete! Congrats on learning 80% of the Language");
        return;
    }

    let current_question = quiz[current_question_index];
    QUESTION_BOX.innerHTML = current_question.question;
    ANSWER_BOX_1.innerHTML = current_question.answers[0];
    ANSWER_BOX_2.innerHTML = current_question.answers[1];
    ANSWER_BOX_3.innerHTML = current_question.answers[2];
    ANSWER_BOX_4.innerHTML = current_question.answers[3];
    
    selected_answer = null; // Reset selectedAnswer

    // !!!! YOU NEED TO ADD THE SOUNDS DONT FORGET AT EVERY DISPLAY 
}

// Check Answer and Select(): 
// Updates the selected answer and highlights it in the UI.
function checkAnswer(event) {
    if (event.key === '1') {
        ANSWER_BOX_1.parentNode.parentNode.style.backgroundColor = "black";
        ANSWER_BOX_1.parentNode.parentNode.style.color = "white";
        selected_answer = quiz[current_question];
    } else if (event.key === '2') {
        alert("clicked 2");
    } else if (event.key === '3') { 
        alert("clicked 3");
    } else if (event.key === '4') {
        alert("clicked 4");
    }
}
document.addEventListener('keydown', checkAnswer);

// checkAnswerKey(): 
// Listens for the ENTER key to submit the selected 
// answer and move to the next question.
function checkAnswerKey(event) {
    /*
    if (event.key === 'Enter') {
        if (selectedAnswer === null) {
            alert("Please select an answer.");
            return;
        }
        
        const question = quiz[currentQuestionIndex];
        if (selectedAnswer === question.correctAnswer) {
            alert("Correct!");
        } else {
            alert("Incorrect!");
        }
        
        currentQuestionIndex++;
        displayQuestion();
    }
    */
}

// start the app when page loads fully
window.onload = function() {
    console.log('Page is fully loaded.');
    displayQuestion();
};

console.log(quiz)