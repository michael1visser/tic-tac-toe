
let red = "red"

let blue = "blue"

let currentPlayer = red

let board = document.querySelector(".board")
let footer = document.querySelector("footer")

let tiles = []


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
        playerSwitch()
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
}

//Function to reset game
function resetGame(){

    tiles = document.querySelectorAll(".tile")
    tiles.forEach(n =>{
        n.setAttribute("class", "tile")
        n.dataset.selected = "false"
        currentPlayer = red
    })
}

footer.addEventListener("click", e =>{
    if(e.target.classList == "reset-button"){
        resetGame()
    }
})