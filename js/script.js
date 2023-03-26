const selectBox = document.querySelector('.select-box');
const playBoard = document.querySelector('.play-board');
const players = document.querySelector('.players');
const boardRegions = document.querySelectorAll('section span');
const result = document.querySelector('.result-box');
const wonText = document.querySelector('.won-text');
let turnPlayer = ''
let vBoard = []

function getWinRegions() {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    return winRegions
}

function updatePlayer() {
    if (turnPlayer ===  "playerO") {
        players.classList.add('active');
    } else {
        players.classList.remove('active')
    }
}

function disableRegion(element) {
    element.classList.remove('cursor-pointer');
    element.removeEventListener('click', handleBoardClick)
}

function handleWin() {
    playBoard.classList.remove('show')
    result.classList.add('display')
    if (turnPlayer === 'playerX') {
        wonText.innerText = 'Player X ganhou o jogo'
    } else {
        wonText.innerText = 'Player O ganhou o jogo'
    }
    
}

function handleBoardClick(ev) {
    const span = ev.currentTarget
    const region = span.dataset.region // N.N
    const rowColumnPair = region.split('.') // ["N", "N"]
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if (turnPlayer === 'playerX') {
        span.innerText = 'X'
        vBoard[row][column] = "X"
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    disableRegion(span);
    console.clear()
    console.table(vBoard)
    const winRegions = getWinRegions()
    if (winRegions.length > 0) {
        handleWin()
    } else if (vBoard.flat().includes('')) {
        turnPlayer = turnPlayer === 'playerX' ? 'playerO' : 'playerX'
        updatePlayer();
    } else {
        console.log('EMPATE!')
    }
}

document.querySelector('.playerX').addEventListener('click', () => {
    turnPlayer = 'playerX'
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
})

document.querySelector('.playerO').addEventListener('click', () => {
    turnPlayer = 'playerO'
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    selectBox.classList.add('hide');
    playBoard.classList.add('show');
    players.classList.add('active')
})

document.querySelector('#replay').addEventListener('click', () => window.location.reload())

boardRegions.forEach((el) => {
    el.addEventListener('click', handleBoardClick)
})