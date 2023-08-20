let topics = {
    Arithmetic: [
        { question: "$$5 + 3$$", answer: "$$8$$" },
        { question: "$$9 - 6$$", answer: "$$3$$" },
    ],
    Integration: [
        { question: "$$\\int_0^1 x^2 dx$$", answer: "$$\\frac{1}{3}$$" },
        // ... other integration questions
    ],
    // ... add more topics as needed
};

let currentTopic = 'Arithmetic'; // default topic
let currentCard = 0;

// Populate topic selection dropdown
for (let topic in topics) {
    let option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    document.getElementById('topicSelect').appendChild(option);
}

document.getElementById('topicSelect').addEventListener('change', function() {
    currentTopic = this.value;
    currentCard = 0;  // Reset card index when topic changes
    updateCard();
});

document.getElementById('next').addEventListener('click', () => {
    currentCard++;
    if (currentCard >= topics[currentTopic].length) currentCard = 0;  // loop back to the beginning
    updateCard();
});

document.getElementById('prev').addEventListener('click', () => {
    currentCard--;
    if (currentCard < 0) currentCard = topics[currentTopic].length - 1;  // loop back to the end
    updateCard();
});

document.getElementById('showAnswer').addEventListener('click', () => {
    document.querySelector('.answer').style.display = 'block';
});

function updateCard() {
    let card = topics[currentTopic][currentCard];
    document.querySelector('.question').innerText = card.question;
    document.querySelector('.answer').innerText = card.answer;
    document.querySelector('.answer').style.display = 'none';

    // Ask MathJax to typeset the updated content
    MathJax.typeset();
}

// Initialize the card for the default topic
updateCard();
