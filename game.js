const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const TileWidth = 20;
const TileHeight = 20;
const mapRows = 20;
const mapColumns = 20;
let walls = [];
// Here `w` indicates a wall block : 
// The `+` sign indicates a pellet : 
// This here `-` indicates blank space : 
// `M` indicates our Player here :
// And lastly `E` indicates our Enemy character : 
function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

let map = [
    "w","w","w","w","w","w","w","w","w","w","w","-","w","-","w","w","w","w","w","w",
    "w","+","+","+","+","E","+","+","p","+","-","-","w","+","+","+","-","+","+","w",
    "w","-","w","w","w","w","w","+","w","w","w","-","w","w","w","w","w","w","+","w",
    "w","+","+","+","+","+","w","+","+","+","w","-","+","+","+","+","+","w","+","w",
    "w","+","w","w","w","w","w","w","w","+","w","w","-","-","w","w","-","w","+","w",
    "w","+","+","+","+","+","-","+","+","+","w","E","-","-","E","w","+","w","-","w",
    "w","-","w","w","w","w","w","+","w","-","w","w","w","w","w","w","-","w","+","w",
    "-","-","+","+","+","+","+","+","w","‒","‒","‒","‒","p","-","-","-","+","-","-",
    "w","w","w","-","w","w","w","-","w","w","-","w","w","w","w","w","-","w","-","w",
    "w","‒","‒","‒","‒","‒","‒","‒","w","w","+","+","+","+","+","+","+","w","-","w",
    "w","+","w","+","w","w","w","-","w","w","+","w","w","w","w","w","+","w","-","w",
    "w","+","w","+","+","+","w","−","M","−","-","w","-","-","-","w","+","-","-","w",
    "w","+","w","+","w","+","w","w","w","w","w","w","-","w","+","+","+","w","w","w",
    "","-","-","w","+","+","+","-","+","+","+","w","-","-","w","-","w","+","w","-",
    "w","-","p","-","w","w","w","+","w","-","+","-","w","w","-","w","+","w","+","w",
    "w","w","w","w","w","+","+","+","w","w","w","w","w","-","-","w","+","+","+","w",
    "","-","+","+","+","+","+","w","-","w","+","+","+","+","+","w","w","w","w","E",
    "w","-","w","w","w","w","w","-","w","-","w","w","w","w","w","w","w","w","-","w",
    "w","E","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","w",
    "w","w","w","w","w","w","w","w","w","w","w","-","w","-","w","w","w","w","w","w"
];
function preload(){

}

function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    // createCanvas(innerWidth, innerHeight);
}

function draw(){
    background("white");
    drawMap();
    // console.log(frameRate());
}

class Player{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    spawn(){

    }
}

class Enemy{
    constructor(x,y,width,height,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    attack(){

    }
}
let pelletWidth = TileWidth/2;
let pelletHeight = TileHeight/2;
let pelletIncrement = 10
function drawMap(){
    pelletIncrement += 0.1
    for(let row = 0; row < mapRows; row++){
        for(let col = 0; col < mapColumns; col++){
            let index = row * mapRows + col;
            // Pellets : 
            if(map[index] == "+"){
                fill("yellow");
                strokeWeight(1);
                pelletHeight = (sin(pelletIncrement) * 4) + 4 
                pelletWidth = (cos(pelletIncrement) * 4) + 7 
                ellipse((TileWidth * col) + 10,(TileHeight * row) + 10,pelletWidth,pelletHeight);
            }
            // Enemy : 
            else if(map[index] == "E"){
                fill("red");
                rect(TileWidth * col,TileHeight * row,TileWidth,TileHeight);
            }
            // Player : 
            else if(map[index] == "M"){
                fill("black");
                rect(TileWidth * col,TileHeight * row,TileWidth,TileHeight);
            }
            // Walls : 
            else if(map[index] == "w"){
                fill(139,69,19);
                rect(TileWidth * col,TileHeight * row,TileWidth,TileHeight);
            }
            // Freeze Power : 
            else if(map[index] == "p"){
                fill(143, 235, 204);
                ellipse((TileWidth * col) + 10,(TileHeight * row) + 10,pelletWidth,pelletHeight);
            }
            console.log(frameRate())
        }
    }
}
