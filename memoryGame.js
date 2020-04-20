const setupForm = document.querySelector('form');
const numOfCards = document.querySelector('input[type="number"]');
const gameBoard = document.querySelector('#game');
const resetBtn = document.querySelector('#reset');
const scoreDisplay = document.querySelector('#score');
let selectedCardColors = [];
let htmlArray = [];
let score = 0;
let numFlippedCards = 0;

const COLORS = [
    'red',
    'blue',
    'green',
    'orange',
    'yellow',
    'gray',
    'cyan',
    'purple',
];

const shuffle = (array) => {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

const isGameOver = () => {
    const cardsOnBoard = gameBoard.children;
    if (numFlippedCards === cardsOnBoard.length) {
        // console.log('game over');
        scoreDisplay.innerText = `Game Over! You have a score of: ${score}`;
    } else {
        scoreDisplay.innerText = `Score: ${score}`;
    }
};

const addCardLogic = (card) => {
    card.addEventListener('click', function (e) {
        card.classList.add('cardFlip');
        if (selectedCardColors.length < 2) {
            selectedCardColors.push(e.target.nextSibling.style.backgroundColor);
            htmlArray.push(card);
        }
        if (selectedCardColors.length === 2) {
            if (selectedCardColors[0] === selectedCardColors[1]) {
                htmlArray.forEach((card) => {
                    card.style.pointerEvents = 'none';
                });
                score++;
                numFlippedCards += 2;
                selectedCardColors = [];
                htmlArray = [];
            } else {
                gameBoard.style.pointerEvents = 'none';
                setTimeout(() => {
                    if (score > 0) {
                        score--;
                    }
                    htmlArray.forEach((card) => {
                        card.classList.remove('cardFlip');
                    });
                    gameBoard.style.pointerEvents = 'auto';
                    selectedCardColors = [];
                    htmlArray = [];
                }, 1000);
            }
        }
        isGameOver();
    });
};

const cardBuilder = (num, colorArr) => {
    for (let i = 0; i < num; i++) {
        const cardContainer = document.createElement('div');
        const card = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');

        cardContainer.setAttribute('class', 'cardContainer');
        card.setAttribute('class', 'card');
        front.setAttribute('class', 'cardFace front');
        back.setAttribute('class', 'cardFace back');
        back.style.backgroundColor = colorArr[i];

        card.appendChild(front);
        card.appendChild(back);
        addCardLogic(card);

        cardContainer.appendChild(card);
        gameBoard.appendChild(cardContainer);
    }
};

setupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (
        numOfCards.value % 2 === 0 &&
        gameBoard.getElementsByClassName('cardContainer').length === 0
    ) {
        const numColorsToUse = numOfCards.value / 2;
        let seletedColors = COLORS.slice(0, numColorsToUse);
        const fullColorArr = seletedColors.concat(seletedColors);

        cardBuilder(numOfCards.value, shuffle(fullColorArr));
    }
    isGameOver();
});

resetBtn.addEventListener('click', function () {
    gameBoard.innerHTML = '';
    selectedCardColors = [];
    htmlArray = [];
    score = 0;
    numFlippedCards = 0;
    scoreDisplay.innerText = `Score: ${score}`;
    numOfCards.value = '';
});
