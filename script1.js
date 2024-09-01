const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆'];
let flippedCards = [];
let matchedCards = 0;

document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    const exitButton = document.getElementById('exitButton');
    const exitMessage = document.getElementById('exitMessage');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(emojis);
        gameBoard.innerHTML = '';
        emojis.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.dataset.emoji = emoji;
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            this.innerHTML = this.dataset.emoji;
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedCards += 2;
            if (matchedCards === emojis.length) {
                setTimeout(() => exitMessage.style.display = 'block', 500);
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerHTML = '';
            card2.innerHTML = '';
        }
        flippedCards = [];
    }

    function restartGame() {
        matchedCards = 0;
        createBoard();
        exitMessage.style.display = 'none';
    }

    function exitGame() {
        document.body.style.backgroundColor = '#f4f4f4';
        document.querySelector('.container').style.display = 'none';
        exitMessage.style.display = 'block';
    }

    restartButton.addEventListener('click', restartGame);
    exitButton.addEventListener('click', exitGame);

    createBoard();
});
