// pelletIncrement += 0.1;
// for(let row = 0; row < mapRows; row++){
//     for(let col = 0; col < mapColumns; col++){
//         let index = row * mapRows + col;
//         // Pellets : 
//         if(map[index] == "+" && w <= 0){
//             // console.log("Pellet");
//             pellets.push(new Pellet((TileWidth * col) + 10,(TileHeight * row) + 10,"yellow"));
//         }
//         // Enemy : 
//         else if(map[index] == "E" && w <= 0){
//             // console.log("Enemy !");
//             enemies.push(new Enemy(TileWidth * col,TileHeight * row,1,1));
//         }
//         // Walls : 
//         else if(map[index] == "w" && w <= 0){
//             // console.log("Walls");
//             walls.push(new Wall(TileWidth * col,TileHeight * row));
//         }
//         // Freeze Power : 
//         else if(map[index] == "p" && w <= 0){
//             let arr = [143, 235, 204];
//             pellets.push(new Pellet((TileWidth*col) + 10,(TileHeight*row) + 10,arr));
//         }
//         // Player : 
//         else if(map[index] == "M"){
//             if(i <= 0){
//                 // console.log("Player");
//                 player = new Player((TileWidth * col) + 10,(TileHeight * row) + 10,TileWidth - 5,TileHeight - 5,8,0,0);
//             }
//             i++;
//         }
//     }
// }
// w++;