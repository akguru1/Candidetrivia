const questions = [
    { question: "Who is Candide's mentor?", options: ["Voltaire", "Pangloss", "Martin", "Jacques"], answer: "Pangloss", prize: "$1", hint: "He is the philosopher who preaches 'all is for the best'" },
    { question: "What is the primary philosophical belief of Pangloss?", options: ["Optimism", "Pessimism", "Realism", "Nihilism"], answer: "Optimism", prize: "$1", hint: "It's the belief that this is the best of all possible worlds" },
    { question: "Which country does Candide travel to after being expelled from the Baron's castle?", options: ["France", "Spain", "Portugal", "Holland"], answer: "Holland", prize: "$1", hint: "Known for its windmills and tulips" },
    { question: "Who is the antibaptist?", options: ["Jacques", "Martin", "Pangloss", "Cunegonde"], answer: "Jacques", prize: "$1", hint: "He is an Anabaptist" },
    { question: "What disaster strikes Lisbon while Candide and Pangloss are there?", options: ["Tornado", "Earthquake", "Flood", "Plague"], answer: "Earthquake", prize: "$1", hint: "A natural disaster that shakes the ground" },
    { question: "Who is Candide's love interest throughout the novel?", options: ["Paquette", "Cunegonde", "The Old Woman", "Dorothee"], answer: "Cunegonde", prize: "$1", hint: "She is the Baron's daughter" },
    { question: "What is the utopian city that Candide and Cacambo discover?", options: ["Eldorado", "Atlantis", "Shangri-La", "Utopia"], answer: "Eldorado", prize: "$1", hint: "A legendary city of gold" },
    { question: "Which character is a pessimistic scholar and becomes Candide's companion?", options: ["Pangloss", "Cacambo", "Martin", "Jacques"], answer: "Martin", prize: "$1", hint: "He believes in the inherent evil of humanity" },
    { question: "How does Candide acquire his wealth in Eldorado?", options: ["Inheriting gold", "Finding treasure", "Collecting gemstones", "Selling sheep"], answer: "Selling sheep", prize: "$1", hint: "These animals are covered in precious stones" },
    { question: "Which character is disfigured and reveals her tragic past to Candide?", options: ["Paquette", "Cunegonde", "The Old Woman", "Dorothee"], answer: "The Old Woman", prize: "$1", hint: "She shares a gruesome story of her past" },
    { question: "What is the ultimate conclusion Candide reaches at the end of the novel?", options: ["To keep traveling", "To return to Eldorado", "To cultivate his garden", "To seek revenge"], answer: "To cultivate his garden", prize: "$1", hint: "He decides to focus on practical work" },
    { question: "Which event first leads Candide to question Pangloss's philosophy?", options: ["The earthquake in Lisbon", "The war with the Bulgarians", "The execution in Lisbon", "Cunegonde's betrayal"], answer: "The earthquake in Lisbon", prize: "$1", hint: "A devastating event that happens in Portugal" },
    { question: "Who is the Anabaptist that aids Candide and Pangloss?", options: ["Martin", "Jacques", "Vanderdendur", "Cacambo"], answer: "Jacques", prize: "$1", hint: "He is kind and selfless" },
    { question: "What happens to Pangloss at the auto-da-fé in Lisbon?", options: ["He is executed", "He escapes", "He converts", "He is imprisoned"], answer: "He is executed", prize: "$1", hint: "A form of public punishment" },
    { question: "Which role does Cunegonde's brother, the Baron, play in Candide's life?", options: ["Mentor", "Villain", "Comrade", "Adviser"], answer: "Villain", prize: "$1", hint: "He opposes Candide's relationship with his sister" },
    { question: "Which character believes that humanity is inherently evil and corrupt?", options: ["Pangloss", "Martin", "Cacambo", "Jacques"], answer: "Martin", prize: "$1", hint: "He is a pessimistic scholar" },
    { question: "What is the primary theme explored in Candide?", options: ["Wealth", "Religion", "Philosophy of optimism", "Political power"], answer: "Philosophy of optimism", prize: "$1", hint: "It's about believing this is the best of all possible worlds" },
    { question: "What literary device is predominantly used by Voltaire in Candide?", options: ["Metaphor", "Simile", "Satire", "Irony"], answer: "Satire", prize: "$1", hint: "A humorous way to criticize society" },
    { question: "Who ultimately helps Candide find a simple, content life?", options: ["Pangloss", "Cacambo", "The Old Woman", "The Farmer"], answer: "The Farmer", prize: "$1", hint: "He teaches Candide the importance of hard work" }
];

let currentQuestionIndex = 0;
let score = 0;
let skipCount = 0;
const maxSkips = 2;
let hintUsed = false;

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    document.getElementById('hint-button').addEventListener('click', showHint);
    document.getElementById('skip-button').addEventListener('click', skipQuestion);
    document.getElementById('restart-button').addEventListener('click', restartGame);
});

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question-text');
    questionElement.textContent = currentQuestion.question;
    questionElement.style.animation = 'fadeIn 0.5s ease';

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        
        // Add hover sound effect
        optionElement.addEventListener('mouseenter', () => {
            const hoverSound = new Audio('click-21156.mp3');
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
        
        optionsContainer.appendChild(optionElement);
    });

    // Reset hint button for each new question
    document.getElementById('hint-button').disabled = false;
    hintUsed = false;

    document.getElementById('prize-display').textContent = `Current Prize: $${score}`;
    updateProgressBar();
    moveCandide();
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionElements = document.querySelectorAll('.option');
    
    // Disable further clicks after an answer is selected
    optionElements.forEach(el => {
        el.style.pointerEvents = 'none';
    });

    // Find the correct answer element
    const correctAnswerElement = Array.from(optionElements).find(
        el => el.textContent === currentQuestion.answer
    );

    if (selectedOption === currentQuestion.answer) {
        // Correct answer
        correctAnswerElement.classList.add('correct');
        
        // Success sound effect
        const successSound = new Audio('success-1-6297.mp3');
        successSound.play();
        
        // Confetti effect
        createConfetti();
        
        score += Math.pow(2, currentQuestionIndex);
        currentQuestionIndex++;
        setTimeout(loadQuestion, 1000);
    } else {
        // Incorrect answer - end game
        correctAnswerElement.classList.add('correct');
        
        // Failure sound effect
        const failureSound = new Audio('fail-234710.mp3');
        failureSound.play();
        
        setTimeout(endGame, 500);
    }
}

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti after animation
    setTimeout(() => {
        document.body.removeChild(confettiContainer);
    }, 5000);
}

function showHint() {
    if (!hintUsed) {
        const currentQuestion = questions[currentQuestionIndex];
        alert(`Hint: ${currentQuestion.hint}`);
        document.getElementById('hint-button').disabled = true;
        hintUsed = true;
    }
}

function skipQuestion() {
    if (skipCount < maxSkips) {
        skipCount++;
        document.getElementById('skip-button').textContent = `Skip (${maxSkips - skipCount} left)`;
        
        // Do not increment currentQuestionIndex to keep the same question
        loadQuestion();
    } else {
        alert("You have reached the maximum number of skips.");
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const totalQuestions = questions.length;
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
}

function endGame() {
    // Hide game controls
    document.getElementById('hint-button').style.display = 'none';
    document.getElementById('skip-button').style.display = 'none';
    document.getElementById('progress-bar').style.visibility = 'none';
    document.getElementById('prize-display').style.display = 'none';

    const questionText = document.getElementById('question-text');
    questionText.textContent = `Game Over! Final Prize: $${score}`;
    questionText.className = 'game-over-text';

    document.getElementById('options-container').innerHTML = '';
    document.getElementById('restart-button').style.display = 'block';

    // Fireworks effect
    createFireworks();
}

function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.position = 'fixed';
    fireworksContainer.style.top = '0';
    fireworksContainer.style.left = '0';
    fireworksContainer.style.width = '100%';
    fireworksContainer.style.height = '100%';
    fireworksContainer.style.pointerEvents = 'none';
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'absolute';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            firework.style.borderRadius = '50%';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.top = '100%';
            firework.style.animation = `firework ${Math.random() * 2 + 1}s ease-out forwards`;
            fireworksContainer.appendChild(firework);

            // Remove firework after animation
            setTimeout(() => {
                fireworksContainer.removeChild(firework);
            }, 2000);
        }, i * 500);
    }

    // Remove fireworks container after animation
    setTimeout(() => {
        document.body.removeChild(fireworksContainer);
    }, 3000);
}

function restartGame() {
    // Show game controls again
    document.getElementById('hint-button').style.display = 'inline-block';
    document.getElementById('skip-button').style.display = 'inline-block';
    document.getElementById('progress-bar').style.display = 'block';
    document.getElementById('prize-display').style.display = 'block';

    currentQuestionIndex = 0;
    score = 0;
    skipCount = 0;
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('hint-button').disabled = false;
    document.getElementById('skip-button').textContent = 'Skip';
    hintUsed = false;
    loadQuestion();
}

function moveCandide() {
    const candide = document.getElementById('candide');
    if (candide) {
        candide.style.left = `${currentQuestionIndex * 50}px`;
    }
}

// Add custom CSS for fireworks and confetti animations
const style = document.createElement('style');
style.textContent = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}

@keyframes firework {
    0% { 
        transform: translate(-50%, 100vh) scale(0);
        opacity: 1;
    }
    50% {
        opacity: 1;
    }
    100% { 
        transform: translate(calc(-50% + ${Math.random() * 200 - 100}px), ${Math.random() * -200}px) scale(2);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);