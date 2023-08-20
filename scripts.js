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
    Logaritmer: [
        {
            type: "standard",
            question: "Hva er grunnleggende definisjonen av en logaritme?",
            answer: "En logaritme er den inverse operasjonen til eksponentiering. Den spør: 'Til hvilken eksponent må vi heve en base for å få et tall?'."
        },
        {
            type: "standard",
            question: "Hvis \( \lg(x) = y \), hvordan kan denne relasjonen uttrykkes i eksponentiell form?",
            answer: "Relasjonen i eksponentiell form ville være \( 10^y = x \)."
        },
        {
            type: "multipleChoice",
            question: "Hva er verdien av \( \lg(100) \)?",
            options: ["1", "2", "10", "100"],
            correctOption: 1
        },
        {
            type: "standard",
            question: "Ved hjelp av logaritmeregenskapene, hvordan kan du forenkle \( \lg(m \times n) \)?",
            answer: "\( \lg(m \times n) = \lg(m) + \lg(n) \)"
        },
        {
            type: "standard",
            question: "Hva representerer \( \ln(x) \) i forhold til base?",
            answer: "Den naturlige logaritmen, \( \ln(x) \), er en logaritme til basen \( e \), hvor \( e \) er en irrasjonell konstant omtrent lik 2.71828."
        },
        {
            type: "multipleChoice",
            question: "Hvilken av følgende er den naturlige logaritmebasen?",
            options: ["2", "10", "e", "Ingen av de ovennevnte"],
            correctOption: 2
        },
        {
            type: "standard",
            question: "Hva er produktsetningen for logaritmer?",
            answer: "\( \lg(m \times n) = \lg(m) + \lg(n) \)"
        },
        {
            type: "standard",
            question: "Hva er kvotientsetningen for logaritmer?",
            answer: "\( \lg\left(\frac{m}{n}\right) = \lg(m) - \lg(n) \)"
        },
        {
            type: "standard",
            question: "Hva er potenssetningen for logaritmer?",
            answer: "\( \lg(m^n) = n \times \lg(m) \)"
        }
    ]
}


    
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
                    //setTimeout(nextCard, 1000); // Move to next card after 1 second
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

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}


// Initialize the card for the default topic
shuffleArray(topics[currentTopic]);
updateCard();
