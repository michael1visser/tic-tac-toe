
let red = "red"

let blue = "blue"

let turn = 0

let currentPlayer = red

let board = document.querySelector(".board")

let footer = document.querySelector("footer")

let tiles = []

let winCombos = [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

let message = document.querySelector("#message")


//Function to set tiles with class tile iterating over the array

function createBoard() {
    for (let i=0; i<9; i++) {
        let tile = document.createElement("div")

        tile.setAttribute("id", `${i}`)

        tile.classList.add("tile")

        tile.dataset.selected = false

        board.appendChild(tile)
    }

    board.addEventListener("click", selectTile)
}

createBoard()



//Function to set clicked tile class of current player

function selectTile(e) {
    

    if (e.target.classList.contains("tile")){
        if (e.target.dataset.selected == "false"){
            
            e.target.classList.add(currentPlayer)

            e.target.dataset.selected = true

            turn++

            printWinner()
        }
    }
}



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

//Function to check for tie and print winner if it is not a tie

function printWinner(){


    if (turn == 9 && checkWinner() == "none") {
        message.innerHTML = "It's a tie. Click Reset to start a new game"
        
    }
    else if (turn >= 5){
         if(checkWinner() == "red"){
            message.innerHTML = "Red Wins! Click Reset to play again."
            
            board.removeEventListener("click", selectTile)
        }
         else if (checkWinner() == "blue"){
            message.innerHTML = "Blue Wins! Click Reset to play again."
            
            board.removeEventListener("click",selectTile)
         }
         else {
        playerSwitch()
         }
    }
    else {
        playerSwitch()
    }

}



//Function to check for a winner
function checkWinner() {
    
    tiles = document.querySelectorAll(".tile")

    let redTiles = []
    let blueTiles = []

    let winner = "none"

    tiles.forEach((n, i) =>{
        if(n.classList.contains("red")){
            redTiles.push(i) 
        }
        else if (n.classList.contains("blue")){
            blueTiles.push(i)
        }   
    })

    winCombos.forEach( n => {
        
        if(n.every(v => redTiles.includes(v))){
            winner = "red"
                }
        else if (n.every(v => blueTiles.includes(v))){
            winner = "blue"
        }
        }
    )


    return winner

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

    board.addEventListener("click", selectTile)
}

footer.addEventListener("click", e =>{
    if(e.target.classList == "reset-button"){
        resetGame()
    }
})