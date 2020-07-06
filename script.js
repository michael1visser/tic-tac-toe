
let red = "red"

let blue = "blue"

let currentPlayer = red

let board = document.querySelector(".board")

let tiles = [0,1,2,3,4,5,6,7,8]


//Function to set tiles with class tile iterating over the array

function createBoard() {
    tiles.forEach(n => {
        let tile = document.createElement("div")
        tile.setAttribute("id", `${n}`)
        tile.classList.add("tile")
        tile.dataset.selected = false
        board.appendChild(tile)
    })
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
//Function to play round and change players

//Function to reset game