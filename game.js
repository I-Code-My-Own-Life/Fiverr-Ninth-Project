const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const TileWidth = 20;
const TileHeight = 20;
const mapRows = 20;
const mapColumns = 20;
let walls = [];
let pellets = [];
let enemies = [];
let pelletWidth = (TileWidth/2) - 4;
let pelletHeight = (TileHeight/2) - 4;
let collided = false;
let keys = {
    w:{pressed:false},
    a:{pressed:false},
    d:{pressed:false},
    s:{pressed:false}
}
let lastKey = '';
// Here `w` indicates a wall block : 
// The `+` sign indicates a pellet : 
// This here `-` indicates blank space : 
// `M` indicates our Player here :
// The `p` indicates the freezing power :
// And lastly `E` indicates our Enemy character : 
function randomIntFromInterval(min,max)
{
    return Math.floor( Math.random()*  ( max - min + 1 ) + min );
}

let map = [
    ["w","w","w","w","w","w","w","w","w","w","w","-","w","-","w","w","w","w","w","w"],
    ["w","+","+","+","+","E","+","+","p","+","-","-","w","+","+","+","-","+","+","w"],
    ["w","-","w","w","w","w","w","+","w","w","w","-","w","w","w","w","w","w","+","w"],
    ["w","+","+","+","+","+","w","+","+","+","w","-","+","+","+","+","+","w","+","w"],
    ["w","+","w","w","w","w","w","w","w","+","w","w","-","-","w","w","-","w","+","w"],
    ["w","+","+","+","+","+","-","+","+","+","w","E","-","-","E","w","+","w","-","w"],
    ["w","-","w","w","w","w","w","+","w","-","w","w","w","w","w","w","-","w","+","w"],
    ["-","-","+","+","+","+","+","+","w","‒","‒","‒","‒","p","-","-","-","+","-","-"],
    ["w","w","w","-","w","w","w","-","w","w","-","w","w","w","w","w","-","w","-","w"],
    ["w","‒","‒","‒","‒","‒","‒","‒","w","w","+","+","+","+","+","+","+","w","-","w"],
    ["w","+","w","+","w","w","w","-","w","w","+","w","w","w","w","w","+","w","-","w"],
    ["w","+","w","+","+","+","w","−","M","−","-","w","-","-","-","w","+","-","-","w"],
    ["w","+","w","+","w","+","w","w","w","w","w","w","-","w","+","+","+","w","w","w"],
    ["-","-","-","w","+","+","+","-","+","+","+","w","-","-","w","-","w","+","-","-"],
    ["w","-","p","-","w","w","w","+","w","-","+","-","w","w","-","w","+","w","+","w"],
    ["w","w","w","w","w","+","+","+","w","w","w","w","w","-","-","w","+","+","+","w"],
    ["-","-","+","+","+","+","+","w","-","w","+","+","+","+","+","w","w","w","-","E"],
    ["w","-","w","w","w","w","w","-","w","-","w","w","w","w","w","w","w","w","-","w"],
    ["w","E","+","+","+","+","+","+","+","+","+","+","-","+","+","+","+","+","+","w"],
    ["w","w","w","w","w","w","w","w","w","w","w","-","w","-","w","w","w","w","w","w"]
];
function preload(){
}

function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    drawMap();
}
function CircleCollision({circle,rect}){
    return (circle.y - circle.radius + circle.dy <= rect.y + rect.height && circle.x + circle.radius + circle.dx >= rect.x && circle.y + circle.radius + circle.dy >= rect.y && circle.x - circle.radius + circle.dx <= rect.x + rect.width)
}
function draw(){
    background("black");
    // player.dy = 0;
    // player.dx = 0;
    if(keys.w.pressed && lastKey === "w"){
        for(let i = 0; i < walls.length; i++){
            let eachWall = walls[i];
            if(CircleCollision({circle:{...player,dy :-1.2},rect:eachWall})){
                player.dy = 0;
                break;
            }
            else{
                player.dy = -1.2
            }
        }
    }
    else if(keys.a.pressed && lastKey == "a"){
        console.log(player.dx)
        for(let i = 0; i < walls.length; i++){
            let eachWall = walls[i];
            if(CircleCollision({circle:{...player,dx : -1.2},rect:eachWall})){
                player.dx = 0;
                break;
            }
            else{
                player.dx = -1.2
            }
        }
    }
    else if(keys.d.pressed && lastKey == "d"){
        for(let i = 0; i < walls.length; i++){
            let eachWall = walls[i];
            if(CircleCollision({circle:{...player,dx : 1.2},rect:eachWall})){
                player.dx = 0;
                break;
            }
            else{
                player.dx = 1.2
            }
        }
    }
    else if(keys.s.pressed && lastKey == "s"){
        for(let i = 0; i < walls.length; i++){
            let eachWall = walls[i];
            if(CircleCollision({circle:{...player,dy :1.2},rect:eachWall})){
                player.dy = 0;
                break;
            }
            else{
                player.dy = 1.2
            }
        }
    }
    // Standing Walls : 
    for(let eachWall of walls){
        eachWall.stand();
        if(CircleCollision({circle:player,rect:eachWall})){
            player.dx = 0;
            player.dy = 0;
        }
    }
    // Spawning Player : 
    player.spawn();
    // Dropping pellets : 
    for(let i = 0; i < pellets.length; i++){
        pellets[i].drop();
    }
    // Attacking enemies : 
    for(let i = 0; i < enemies.length; i++){
        enemies[i].attack();
    }
    CollisionDetection();
}

class Wall{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = TileWidth;
        this.height = TileHeight;
    }
    stand(){
        fill(139,69,19);
        rect(this.x,this.y,this.width,this.height);
    }
}

class Pellet{
    constructor(x,y,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = pelletWidth;
        this.height = pelletHeight;
    }
    drop(){
        // This is pellet : 
        if(typeof(this.color == "string")){
            fill(this.color);
        }
        // This is freeze power : 
        else{
            fill(...this.color);
        }
        strokeWeight(1);
        // this.height = (sin(pelletIncrement) * 4) + 4;
        // this.width = (cos(pelletIncrement) * 4) + 5; 
        ellipse(this.x,this.y,this.width,this.height);
    }
}
class Player{
    constructor(x,y,width,height,radius,dx,dy){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    spawn(){
        // fill("blue");
        // rect(this.x,this.y,this.width,this.height);
        fill("blue");
        circle(this.x,this.y,this.radius * 2);
        this.x += this.dx;
        this.y += this.dy;
    }
}

class Enemy{
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.width = TileWidth;
        this.height = TileHeight;
        this.dx = dx;
        this.dy = dy;
    }
    attack(){
        fill("red");
        rect(this.x,this.y,this.width,this.height);
        // this.x += this.dx;
        // this.y += this.dy;
    }
}
let pelletIncrement = 10;
let player;
let PLAYER_SPEED = 1.2;
let i = 0;
let w = 0;
function drawMap(){
    for(let row = 0; row < map.length; row++){
        for(let col = 0; col < map[row].length; col++){
            const tile = map[row][col];
            switch (tile){
                case "w":
                    walls.push(new Wall(TileWidth * col,TileHeight * row));
                    break;
                case "+":
                    pellets.push(new Pellet((TileWidth * col) + 10,(TileHeight * row) + 10,"yellow"));
                    break;
                case "E":
                    enemies.push(new Enemy(TileWidth * col,TileHeight * row,1,1));
                    break;
                case "p":
                    let arr = [143, 235, 204];
                    pellets.push(new Pellet((TileWidth*col) + 10,(TileHeight*row) + 10,arr));
                    break;
                case "M":
                    player = new Player((TileWidth * col) + 10,(TileHeight * row) + 10,TileWidth,TileHeight,9,0,0);
                    break;
            }
        }
    }
}
addEventListener("keydown",(event)=>{
  switch(event.key){
    case "w":
        keys.w.pressed = true;
        lastKey = "w"
        break;
    case "a":
        keys.a.pressed = true;
        lastKey = "a"
        break;
    case "d":
        keys.d.pressed = true;
        lastKey = "d"
        break;
    case "s":
        keys.s.pressed = true;
        lastKey = "s"
        break;
  }
})
addEventListener("keyup",(event)=>{
    switch(event.key){
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
        case "d":
            keys.d.pressed = false;
            break;
        case "s":
            keys.s.pressed = false;
            break;
      }
})

function CollisionDetection(){
    for(let i = 0; i < pellets.length; i++){
        if(dist(player.x, player.y, pellets[i].x, pellets[i].y) < 16){
            pellets.splice(i,1);
        }
    }
}

