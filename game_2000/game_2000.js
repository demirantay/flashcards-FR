/*
    Game 2000 words
    Written by Demir Antay
    @demirantay on github
*/

/* -----------------------  Data Stuctures ------------------------------- */
let PROGRESS_BAR = document.getElementById("progress-bar");
let PROGRESS_STATUS = document.getElementById("progress-status");
let GAME_LIVES = 10;
let dom_game_lives = document.getElementById("game-lives-num");
dom_game_lives.innerHTML = GAME_LIVES;
PROGRESS_STATUS.style.width = "0%";

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
// we get it from game_words.js file in the same folder

// Generate the QUIZ DS and its questions
fisherYatesShuffle(vocab_pack);
let quiz = [];

vocab_pack.forEach(function (item) {
    let rand_indx_1 = Math.floor(Math.random() * vocab_pack.length);
    let rand_indx_2 = Math.floor(Math.random() * vocab_pack.length);
    let rand_indx_3 = Math.floor(Math.random() * vocab_pack.length);
    let question = {
        question: item[0],
        answers: fisherYatesShuffle([item[1], vocab_pack[rand_indx_1][1], vocab_pack[rand_indx_2][1], vocab_pack[rand_indx_3][1]]),
        correctAnswer: item[1],
        audio: item[2],
    };
    quiz.push(question);
});

/* -------------------- MAIN GAME (ALGORITHMS) ---------------------------- */

let selected_answer = null;
let isAnswerChecked = false;

// quit_game():
function quit_game(status) {
    if (status == "won") {
        alert("🎉🍾 YOU WIN THE GAME! -> 📊 Current Score: " + CURRENT_SCORE.innerHTML);
    } else {
        alert("📈 Lost -> 📊 Current Score: " + CURRENT_SCORE.innerHTML);
    } 
    window.location.href = "../index.html";
}

document.getElementById("close-btn").onclick = function(e) {
    e.preventDefault();
    quit_game();
}

// displayQuestion(): 
// Manages the display of questions and answers.
function displayQuestion() {
    if (quiz == [] || quiz.length == 0) {
        quit_game("won");
    }

    let current_question = quiz[0];
    QUESTION_BOX.innerHTML = current_question.question;
    ANSWER_BOX_1.innerHTML = current_question.answers[0];
    ANSWER_BOX_2.innerHTML = current_question.answers[1];
    ANSWER_BOX_3.innerHTML = current_question.answers[2];
    ANSWER_BOX_4.innerHTML = current_question.answers[3];

    selected_answer = null; // Reset selectedAnswer

    // Play the pronuncation
    let audio = new Audio('../2000_audio/'+current_question.audio);
    audio.play();
}

// Check Answer and Select(): 
// Updates the selected answer and highlights it in the UI.
ANSWER_BOX_1.parentNode.parentNode.onclick = function () {
    selectAnswer(0);
};
ANSWER_BOX_2.parentNode.parentNode.onclick = function () {
    selectAnswer(1);
};
ANSWER_BOX_3.parentNode.parentNode.onclick = function () {
    selectAnswer(2);
};
ANSWER_BOX_4.parentNode.parentNode.onclick = function () {
    selectAnswer(3);
};

function selectAnswer(index) {
    let current_question = quiz[0];

    selected_answer = current_question.answers[index];
    ANSWER_BOX_1.parentNode.parentNode.classList.remove("answer-cell-selected");
    ANSWER_BOX_2.parentNode.parentNode.classList.remove("answer-cell-selected");
    ANSWER_BOX_3.parentNode.parentNode.classList.remove("answer-cell-selected");
    ANSWER_BOX_4.parentNode.parentNode.classList.remove("answer-cell-selected");

    document.getElementById(`answer_${index + 1}`).parentNode.parentNode.classList.add("answer-cell-selected");
}

// checkAnswer():
function checkAnswer() {
    if (!isAnswerChecked) {
        let current_question = quiz[0];

        // Check if an answer is selected
        if (selected_answer == null) {
            alert("Please select an answer.");
            return;
        }

        // Check if the selected answer is correct / incorrect
        if (selected_answer == current_question.correctAnswer) {
            check_success_audio.play();
            document.getElementById("bottom-part").style.backgroundColor = "#82e0aa";
            CURRENT_SCORE.innerHTML++;
            let currentWidth = parseFloat(PROGRESS_STATUS.style.width);
            let newWidth = currentWidth + 0.05;
            PROGRESS_STATUS.style.width = newWidth + "%";
            // Remove element if correct
            quiz.splice(0, 1);
        } else {
            check_error_audio.play();
            document.getElementById("bottom-part").style.backgroundColor = "#ec7063";
            GAME_LIVES -= 1;
            dom_game_lives.innerHTML = GAME_LIVES;
            // Move to the end if incorrect
            let moving = quiz.splice(0, 1)[0];
            quiz.push(moving);

            if (GAME_LIVES <= 0) {
                quit_game();
                return;
            }
        }
        CHECK_BOX.innerHTML = "<span class='fa fa-arrow-right'></span>  Next";
        isAnswerChecked = true;
    } else {
        // Prepare for the next question
        document.getElementById("bottom-part").style.backgroundColor = "white";
        ANSWER_BOX_1.parentNode.parentNode.classList.remove("answer-cell-selected");
        ANSWER_BOX_2.parentNode.parentNode.classList.remove("answer-cell-selected");
        ANSWER_BOX_3.parentNode.parentNode.classList.remove("answer-cell-selected");
        ANSWER_BOX_4.parentNode.parentNode.classList.remove("answer-cell-selected");

        // Clear the selected answer for the next question
        selected_answer = null;

        displayQuestion();

        CHECK_BOX.innerHTML = "<span class='fa fa-check'></span> Check";
        isAnswerChecked = false;
    }
}

// Keydown event handling for "Enter" and "1", "2", "3", "4" keys
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    } else if (event.key === "1") {
        selectAnswer(0);
    } else if (event.key === "2") {
        selectAnswer(1);
    } else if (event.key === "3") {
        selectAnswer(2);
    } else if (event.key === "4") {
        selectAnswer(3);
    }
});

// CHECK button click handler
CHECK_BOX.onclick = function () {
    checkAnswer();
};

// Start the app when page loads fully
window.onload = function () {
    console.log('Page is fully loaded.');
    displayQuestion();
};

