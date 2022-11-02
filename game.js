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
    // for(let i = 0; i < walls.length; i++){
    //     walls[i].draw();
    // }
    drawMap();
    // console.log(frameRate());
}
// Ok, so let's design the class Wall : 
class Wall{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = TileWidth;
        this.height = TileHeight;
    }
    draw(){
        fill(139,69,19);
        rect(this.x,this.y,this.width,this.height);
    }
}
let wall = new Wall(80,150);

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
                pelletHeight = sin(pelletIncrement) * 10
                pelletWidth = cos(pelletIncrement) * 10
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
                walls.push(new Wall(TileWidth * col,TileHeight * row));
                fill(139,69,19);
                rect(TileWidth * col,TileHeight * row,TileWidth,TileHeight);
            }
            console.log(frameRate())
        }
    }
}
