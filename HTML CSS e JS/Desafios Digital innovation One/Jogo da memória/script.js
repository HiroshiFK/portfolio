const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let cardsFlipped = []

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        cardsFlipped.push(firstCard.dataset.card);
        disableCards();
        if (cardsFlipped.length >= 6) {
        endGame();            
        }

        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1300);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

function endGame() {
    setTimeout(() => {
        cardsFlipped.splice(0,6);
        alert('Congratulations!!!\n\nClick OK to restart');
        newGame();
    }, 1200);
}

function newGame() {
    setTimeout(() => {
        resetBoard();
        cards.forEach((card) => {
            card.classList.remove('flip');
        });
        cards.forEach((card) => {
            card.addEventListener('click', flipCard)
        });
    }, 1000);

    lockBoard = true;

    setTimeout(() => {
        (function shuffle() {
            cards.forEach((card) => {
                let randomPosition = Math.floor(Math.random() * 12);
                card.style.order = randomPosition;
            })
        })();
    }, 1500);

    resetBoard();
}