const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const scoreContainerElement = document.getElementById('score-container')
const scoreElement = document.getElementById('score')
const messageElement = document.getElementById('message')
const timerElement = document.getElementById('timer')

let shuffledQuestions, currentQuestionIndex
let score = 0
let timer
const timeLimit = 7 // seconds

startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add('hide')
    document.body.className = 'neutral'  // Reset body class to neutral
    messageElement.classList.add('hide') // Hide message element
    score = 0
    updateScore()
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    scoreContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    startTimer()
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    clearInterval(timer)
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (correct) {
        score += 5
    } else {
        score -= 5
    }
    updateScore()

    if (score <= 0) {
        displayMessage('You Lost!', 'lost', true)
        return
    } else if (score === 20 || score === 30 || score === 40 || score === 50|| score === 60 ||score === 70|| score === 80 ||score === 90 ) {
        displayMessage(`Congratulations! You've reached ${score} points!`, 'congrats', false)
    } else if (score >= 100) {
        displayMessage('Congratulations! You won the game!', 'congrats', true)
        return
    }

    currentQuestionIndex++
    if (currentQuestionIndex < shuffledQuestions.length) {
        setTimeout(() => setNextQuestion(), 1000)
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function updateScore() {
    scoreElement.innerText = `Score: ${score}`
}

function displayMessage(message, className, restart) {
    messageElement.innerText = message
    messageElement.classList.remove('hide')
    document.body.className = className
    if (restart) {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        questionContainerElement.classList.add('hide')
    } else {
        setTimeout(() => {
            messageElement.classList.add('hide')
            document.body.className = 'neutral'
        }, 2000)
    }
}

function startTimer() {
    let timeLeft = timeLimit
    timerElement.innerText = `Time: ${timeLeft}`
    timer = setInterval(() => {
        timeLeft--
        timerElement.innerText = `Time: ${timeLeft}`
        if (timeLeft <= 0) {
            clearInterval(timer)
            currentQuestionIndex++
            if (currentQuestionIndex < shuffledQuestions.length) {
                setNextQuestion()
            } else {
                startButton.innerText = 'Restart'
                startButton.classList.remove('hide')
            }
        }
    }, 1000)
}

const questions = [
    {
        question: 'Who is VIRAT KOHLI?',
        answers: [
            { text: 'Actor', correct: false },
            { text: 'Cricketer', correct: true },
            { text: 'Dancer', correct: false },
            { text: 'Singer', correct: false }
        ]
    },
    {
        question: 'How many bones are in the human body?',
        answers: [
            { text: '205', correct: false },
            { text: '206', correct: true },
            { text: '213', correct: false },
            { text: '208', correct: false }
        ]
    },
    {
        question: 'value of 2 square',
        answers: [
            { text: '8', correct: false },
            { text: '4', correct: true },
            { text: '12', correct: false },
            { text: '6', correct: false }
        ]
    },
    {
        question: 'Which city is known as the "City of Canals"?',
        answers: [
            { text: 'Paris', correct: false },
            { text: 'Venice', correct: true },
            { text: 'New York', correct: false },
            { text: 'Tokyo', correct: false }
        ]
    },
    {
        question: 'Which country is the smallest in the world?',
        answers: [
            { text: 'Monaco', correct: false },
            { text: 'India', correct: false },
            { text: 'Vatican City', correct: true },
            { text: 'Nepal', correct: false }
        ]
    },
    {
        question: 'Which is the hottest continent on Earth?',
        answers: [
            { text: 'Europe', correct: false },
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: false },
            { text: 'Africa', correct: true }
        ]
    },
    {
        question: 'Which is the national game of USA?',
        answers: [
            { text: 'Football', correct: false },
            { text: 'Basketball', correct: false },
            { text: 'Baseball', correct: true },
            { text: 'Soccer', correct: false }
        ]
    },
    {
        question: 'Who is Narendra Modi?',
        answers: [
            { text: 'Actor', correct: false },
            { text: 'Cricketer', correct: false },
            { text: 'Prime Minister', correct: true },
            { text: 'Dancer', correct: false }
        ]
    },
    {
        question: 'Oldest programming language?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'Fortran', correct: true },
            { text: 'Django', correct: false },
            { text: 'C#', correct: false }
        ]
    },
    {
        question: 'Father of technology?',
        answers: [
            { text: 'Albert Einstein', correct: false },
            { text: 'Nikola Tesla', correct: false },
            { text: 'Pythagoras', correct: false },
            { text: 'Thomas Edison', correct: true }
        ]
    },
    {
        question: 'Byte value of double?',
        answers: [
            { text: '8', correct: true },
            { text: '4', correct: false },
            { text: '6', correct: false },
            { text: '16', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the red planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false }
        ]
    },
    {
        question: 'Which is the smallest prime number?',
        answers: [
            { text: '2', correct: true },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'In what year did Titanic sink?',
        answers: [
            { text: '1912', correct: true },
            { text: '1905', correct: false }
        ]
    },
    {
        question: 'Who wrote Romeo and Juliet?',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Charles Dickens', correct: false }
        ]
    },
    {
        question: 'Capital of Japan?',
        answers: [
            { text: 'Tokyo', correct: true },
            { text: 'Beijing', correct: false }
        ]
    },
    {
        question: 'Hardest natural substances on the earth?',
        answers: [
            { text: 'Diamond', correct: true },
            { text: 'Gold', correct: false }
        ]
    },
    {
        question: 'Which country is known as the land of the rising sun?',
        answers: [
            { text: 'Japan', correct: true },
            { text: 'China', correct: false }
        ]
    },
    {
        question: 'Currency of Japan?',
        answers: [
            { text: 'Yen', correct: true },
            { text: 'Yuan', correct: false }
        ]
    },
    {
        question: 'Which is the largest island in the world?',
        answers: [
            { text: 'Greenland', correct: true },
            { text: 'Australia', correct: false }
        ]
    },
    {
        question: 'Which tree is tall?',
        answers: [
            { text: 'Banyan', correct: false },
            { text: 'Eucalyptus', correct: true }
        ]
    },
    {
        question: 'Name a flower commonly used in Indian weddings and festivals?',
        answers: [
            { text: 'Marigold', correct: true },
            { text: 'Jasmine', correct: false }
        ]
    },
    {
        question: 'Which bird can fly backwards?',
        answers: [
            { text: 'Hummingbird', correct: true },
            { text: 'Eagle', correct: false }
        ]
    },
    {
        question: 'Which animal never sleeps?',
        answers: [
            { text: 'Giraffe', correct: true },
            { text: 'Bullfrog', correct: false }
        ]
    }
]
