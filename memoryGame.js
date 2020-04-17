const setupForm = document.querySelector('form');
const numOfCards = document.querySelector('input[type="number"]');
const gameBoard = document.querySelector('#game');
const resetBtn = document.querySelector('#reset');

// Next CSS Steps!
// 1) transition in the gameboard
// 2) style the header
// 3) style the body background

// Next JS Steps!
// 1) get that shuffle function in here
// 2) implement it so that the back of each card is a shuffled color
// 3) buildout game logic

const cardBuilder = (num) => {
    for (let i = 0; i < num; i++) {
        const cardContainer = document.createElement('div');
        const card = document.createElement('div');
        const front = document.createElement('div');
        const back = document.createElement('div');

        cardContainer.setAttribute('class', 'cardContainer');
        card.setAttribute('class', 'card');
        front.setAttribute('class', 'cardFace front');
        back.setAttribute('class', 'cardFace back');

        card.appendChild(front);
        card.appendChild(back);
        card.addEventListener('click', function () {
            card.classList.toggle('cardFlip');
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
        cardBuilder(numOfCards.value);
        // gameBoard.style.visibility = 'visible';
    }
});

resetBtn.addEventListener('click', function () {
    gameBoard.innerHTML = '';
});
