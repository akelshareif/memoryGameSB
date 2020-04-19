const setupForm = document.querySelector('form');
const numOfCards = document.querySelector('input[type="number"]');
const gameBoard = document.querySelector('#game');
const resetBtn = document.querySelector('#reset');
let selectedCardColors = [];
let htmlArray = [];
let score = 0;

// Next CSS Steps!
// 1) transition in the gameboard
// 2) style the header
// 3) style the body background
// 4) style score
// 5) style game win condition

// Next JS Steps!
// 1) figure out how to make sure two unmatched cards are flipped before flipping them back
// 2) maybe adding a settimeout would solve problem, but it also completes game logic
// 3) flip unmatched cards back after some time passed
// 4) calculate a score when cards are matched and update it on DOM
// 5) add game win logic for when all cards are flipped
// 6) clean up code via refactoring

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

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
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
        card.addEventListener('click', function (e) {
            card.classList.add('cardFlip');
            if (selectedCardColors.length < 2) {
                selectedCardColors.push(
                    e.target.nextSibling.style.backgroundColor
                );
                htmlArray.push(card);
            }
            if (selectedCardColors.length === 2) {
                if (selectedCardColors[0] === selectedCardColors[1]) {
                    console.log('stay flipped');
                    selectedCardColors = [];
                    htmlArray = [];
                } else {
                    console.log('flip back');
                    setTimeout(() => {
                        htmlArray.forEach((card) => {
                            card.classList.remove('cardFlip');
                        });
                        selectedCardColors = [];
                        htmlArray = [];
                    }, 2000);
                }
            }
        });

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
});

resetBtn.addEventListener('click', function () {
    gameBoard.innerHTML = '';
});
