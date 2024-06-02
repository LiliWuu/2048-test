var board;
var rows = 4;
var score = 0;
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



    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString();
            console.log(board[r])
            let num = board[r][c];
            updateTile(tile, num)
            document.getElementById("board").append(tile);
        }
    }
    setTile();
    setTile();

}

function hasEmptyTile() {
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns; c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}

function setTile() {
    if (!hasEmptyTile()){
        return;
    }
    let found = false; 
    while(!found) {
        //random r, c
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
   
            if(board[r][c] == 0){
                board[r][c] = Math.random() < 0.3? 2: 4;
                let tile = document.getElementById(r.toString() + "-"+ c.toString());
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;

            }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList; won't be "tile x2 x4 x8"
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}



// controls movement 
document.addEventListener("keyup",(e) => {
    setTile();
    if(e.code === "ArrowLeft"){
        slideLeft();
    }
    else if(e.code === "ArrowRight"){
        slideRight();
    }
    else if(e.code === "ArrowUp"){
        slideUp();
    }
     else if (e.code = "ArrowDown"){
        slideDown();
     }
     document.getElementById("score").innerText = score;
})

function filterZero(row){
    return row.filter(num => num != 0); // 1. creates a new array (copy of original) + takes all nums except 0s
}

function slide(row){
    row = filterZero(row); // 2. new array is w/o zeroes

    //slide
    for (i=0; i<row.length; i++){
        //check every 2
        if(row[i] == row[i+1]){
           row[i] *= 2; 
           row[i+1] =0;
           score += row[i];
        } // [2,2,2] -> [4,0,2]
    }
    row = filterZero(row); //[4,2]
    //add zeroes
    while(row.length < columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row); // new row with sliding
        board[r] = row; // update new row back to the board

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    
}

function slideRight(){
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row); // new row with sliding
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            let num = board[r][c];
            updateTile(tile, num);
        }
    } 
}

function slideUp(){
        for (let c = 0; c < columns; c++){
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
            row = slide(row)
            for (let r = 0; r < columns; r++){
                board[r][c] = row[r];
                let tile = document.getElementById(r.toString() + "-" + c.toString())
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
}

function slideDown(){
    for (c = 0; c < columns; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}