var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
 }
     
 function setGame() {
 
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns; c++){
             let tile = document.createElement("div")
             tile.id = r.toString() + "-" + c.toString();
             let num = board[r][c];
             drawTiles(tile, num)
             document.getElementById("board").append(tile);

         }
     }
     spawnBlocks();
     spawnBlocks();

 
 }

function emptyBlocks () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if(board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}
function spawnBlocks() {
    if(!emptyBlocks()) {
        return;
    }
    let found = false; 
    while(!found) {
        //random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
            if(board[r][c] == 0){
                board[r][c] = Math.random() < 0.8? 2: 4;
                let value = board[r][c];
                let tile = document.getElementById(r.toString() + "-"+ c.toString());
                tile.innerText = `${value}`;
                tile.classList.add("tile" + value.toString());
                found = true;
            }
    }
        
}


// controls
document.addEventListener("keyup",(e) => {
    spawnBlocks();
    if(e.code == "ArrowLeft") {
        slideLeft();
    }
    if(e.code == "ArrowRight") {
        slideRight();
    }
    if(e.code == "ArrowUp") {
        slideUp();
    }
    if(e.code == "ArrowDown") {
        slideDown();
    }
    document.getElementById("score").innerText = score;
})

function drawTiles(tile, num) {
    tile.classList.value = "";
    tile.classList.add("tile");
    tile.innerText = "";

    if (num > 0) {
        tile.innerText = num;
        tile.classList.add("tile" + num.toString());
    }
}

function slide(row) {
    row = deleteZeroes(row);
    for (let i = 0; i < row.length; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i]
        }
    }
    
    row = deleteZeroes(row);
    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            drawTiles(tile, num);
        }
    }
}

function slideRight() { 
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            drawTiles(tile, num);
        }
    }
}


function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            drawTiles(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            drawTiles(tile, num);
        }

    }
}

function deleteZeroes(row) {
    return row.filter((num) => num != 0);
}