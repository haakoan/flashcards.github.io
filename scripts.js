let topics = {
    Arithmetic: [
        { type: 'standard', question: "$$5 + 3$$", answer: "$$8$$" },
        {
            type: 'multipleChoice',
            question: "What is $$5 + 3$$?",
            choices: ["6", "8", "9"],
            correctIndex: 1
        },
        // ... other questions
    ],
    // ... other topics
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

document.getElementById('flashcard').addEventListener('click', function(event) {
    if (event.target.classList.contains('left')) {
        // Clicked on the left side of the card
        prevCard();
    } else if (event.target.classList.contains('right')) {
        // Clicked on the right side of the card
        if (document.querySelector('.answer').style.display === 'block' || document.querySelector('.choices').style.display === 'block') {
            // If answer or choices are showing, move to the next card
            nextCard();
        } else {
            // If answer is not showing, reveal it
            document.querySelector('.answer').style.display = 'block';
        }
    }
});

function nextCard() {
    currentCard++;
    if (currentCard >= topics[currentTopic].length) currentCard = 0;  // loop back to the beginning
    updateCard();
}

function prevCard() {
    currentCard--;
    if (currentCard < 0) currentCard = topics[currentTopic].length - 1;  // loop back to the end
    updateCard();
}

function updateCard() {
    let card = topics[currentTopic][currentCard];
    let questionDiv = document.querySelector('.question');
    let answerDiv = document.querySelector('.answer');
    let choicesList = document.querySelector('.choices');
    
    questionDiv.innerText = card.question;
    
    if (card.type === 'standard') {
        answerDiv.innerText = card.answer;
        choicesList.style.display = 'none';
        answerDiv.style.display = 'none';
    } else if (card.type === 'multipleChoice') {
        choicesList.innerHTML = ''; // Clear existing choices
        card.choices.forEach((choice, index) => {
            let li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', function() {
                if (index === card.correctIndex) {
                    li.classList.add('correct');
                    li.innerHTML += "<span class='icon'>✓</span>";
                    setTimeout(nextCard, 1000); // Move to next card after 1 second
                } else {
                    li.classList.add('incorrect');
                    li.innerHTML += "<span class='icon'>✗</span>";
                }
                choicesList.querySelectorAll('li').forEach(item => item.removeEventListener('click', arguments.callee));
            });
            choicesList.appendChild(li);
        });
        choicesList.style.display = 'block';
        answerDiv.style.display = 'none';
    }
    
    // Ask MathJax to typeset the updated content
    MathJax.typeset();
}

// Initialize the card for the default topic
updateCard();
