const cardsArray = [{
        name: 'guns',
        img: 'imgs/guns1.jpg',
    },
    {
        name: 'iron',
        img: 'imgs/iron1.jpg',
    },
    {
        name: 'korn',
        img: 'imgs/korn.jpeg',
    },
    {
        name: 'limp',
        img: 'imgs/limp.jpg',
    },
    {
        name: 'linkin',
        img: 'imgs/linkin.jpg',
    },
    {
        name: 'metalica',
        img: 'imgs/metalica1.jpg',
    },
    {
        name: 'nirvana',
        img: 'imgs/nirvana.jpg',
    },
    {
        name: 'off',
        img: 'imgs/off.jpg',
    },
    {
        name: 'pink',
        img: 'imgs/pink.jpg',
    },
    {
        name: 'rage',
        img: 'imgs/rage1.jpg',
    },
    {
        name: 'slipknot',
        img: 'imgs/slipknot.jpg',
    },
    {
        name: 'systen',
        img: 'imgs/systen.jpg',
    },
]

const gameGrid = cardsArray
    .concat(cardsArray)
    .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
    const { name, img } = item;

    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = name;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
});

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('match');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

grid.addEventListener('click', event => {

    const clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' ||
        clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')
    ) {
        return;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
            }
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }

});