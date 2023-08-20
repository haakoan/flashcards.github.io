let cards = [
    { question: "$$5 + 3$$", answer: "$$8$$" },
    { question: "$$\\int_0^1 x^2 dx$$", answer: "$$\\frac{1}{3}$$" },
    // Add more cards as needed
];

let currentCard = 0;

// Initialize the card with both question and answer
updateCard();

document.getElementById('next').addEventListener('click', () => {
    currentCard++;
    if (currentCard >= cards.length) currentCard = 0;  // loop back to the beginning
    updateCard();
});

document.getElementById('prev').addEventListener('click', () => {
    currentCard--;
    if (currentCard < 0) currentCard = cards.length - 1;  // loop back to the end
    updateCard();
});

document.getElementById('showAnswer').addEventListener('click', () => {
    document.querySelector('.answer').style.display = 'block';
});

function updateCard() {
    document.querySelector('.question').innerText = cards[currentCard].question;
    document.querySelector('.answer').innerText = cards[currentCard].answer;
    document.querySelector('.answer').style.display = 'none';

    // Ask MathJax to typeset the updated content
    MathJax.typeset();
}
