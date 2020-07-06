
let red = "red"

let blue = "blue"

let turn = 0

let currentPlayer = red

let board = document.querySelector(".board")
let footer = document.querySelector("footer")

let tiles = []

let winCombos = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[3,4,6]]

let message = document.querySelector("#message")


//Function to set tiles with class tile iterating over the array

function createBoard() {
    for (let i=0; i<9; i++) {
        let tile = document.createElement("div")
        //tile.setAttribute("id", `${i}`)
        tile.classList.add("tile")
        tile.dataset.selected = false
        board.appendChild(tile)
    }
}

createBoard()



//Function to set clicked tile class of current player

function selectTile(e, currentPlayer) {

    console.log("selected")
    console.log(e)
    if (e.target.dataset.selected == "false"){
        console.log("false")
        e.target.classList.add(currentPlayer)
        e.target.dataset.selected = true
        turn++
        checkWinner()
    }
    else {
        console.log("aready selected")
    }
}

board.addEventListener("click", e =>{
    if (e.target.classList.contains("tile")){
    selectTile(e, currentPlayer)
    }
})

//Function to switch players
function playerSwitch () {
    if (currentPlayer == "red"){
        currentPlayer = blue
        
    }
    else {
        currentPlayer = red
    }

    message.innerHTML = (`${currentPlayer} chooses next.`)
}

//Function to check for winner

function checkWinner(){

  /*   let totalSelected = 0
        
    tiles.forEach(n => {
        if (n.dataset.selected == "true"){
            totalSelected++
        }
    }) */

    if (turn == 9 && printWinner() == false) {
        message.innerHTML = "It's a tie. Click Reset to start a new game"
        console.log("tie")
        
    }
    else if (turn >= 5 && printWinner() == false){
        playerSwitch()
        console.log("keep going")
        
    }
    else {
        playerSwitch()
    }

}


//Function to print the winner if it is not a tie
function printWinner() {
    
        tiles = document.querySelectorAll(".tile")

        let redTiles = []
        let blueTiles = []

        tiles.forEach( n =>{
            if(n.classList.contains("red")){
                redTiles.push(n) 
            }
            else if (n.classList.contains("blue")){
                blueTiles.push(n)
            }   
        })

        winCombos.forEach( n => {
            if(n.every(v => redTiles.includes(v))){
                message.innerHTML = "Red Wins! Click Reset to play again."
                board.removeEventListener("click", e =>{
                    if (e.target.classList.contains("tile")){
                    selectTile(e, currentPlayer)
                    }
                })
            }
            else if (n.every(v => redTiles.includes(v))){
                message.innerHTML = "Blue Wins! Click Reset to play again."
                board.removeEventListener("click", e =>{
                    if (e.target.classList.contains("tile")){
                    selectTile(e, currentPlayer)
                    }
                })
            }
            else {
                return false
            }

        })

}

//Function to reset game
function resetGame(){

    tiles = document.querySelectorAll(".tile")
    tiles.forEach(n =>{
        n.setAttribute("class", "tile")
        n.dataset.selected = "false"
        currentPlayer = red
        message.innerHTML = "Red chooses first"
        turn = 0
    })
}

footer.addEventListener("click", e =>{
    if(e.target.classList == "reset-button"){
        resetGame()
    }
})