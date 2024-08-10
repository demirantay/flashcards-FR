// Game 2000 words

// randomized list
// list with audio file.


// quit btn logic and personal records
// 3 lives logic
// DOM key and enter logic
// rifht or wrong (list shrinking + progress bar logic + panel colors)


let lesson_pack_words = {{ lesson_pack_words| safe }}
let check_success_audio = new Audio("{% static 'sounds/check-success-sound.wav' %}");
let check_error_audio = new Audio("{% static 'sounds/check-error-sound-2.wav' %}");