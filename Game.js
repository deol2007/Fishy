class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    fish1 = createSprite(100,10);
    
    fish1.scale= 0.1;
    fish2 = createSprite(300,10);
    
    fish2.scale= 0.1;
    fish3 = createSprite(500,10);
    
    fish3.scale= 0.1;
    fish4 = createSprite(700,10);
   
    fish4.scale= 0.1;
    fishs = [fish1, fish2, fish3, fish4];
    
    fish1.addImage(fish1Img);
    fish2.addImage(fish2Img);
    fish3.addImage(fish3Img);
    fish4.addImage(fish4Img);
   
    
    
  }
 

  play(){
    form.hide();

    Player.getPlayerInfo();

    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
     background(underTheSeaImg).width/2;
     //image(underTheSeaImg,0,-displayHeight*10,displayWidth,displayHeight*5)
     //image(underTheSeaImg,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 220;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        fishs[index-1].x = x;
        fishs[index-1].y = y;

        if (index === player.index){
          fill("yellow");
          ellipse(x,y,60,60);
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = fishs[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW)){
      player.y +=10
      player.update();
    }

    /*if(keyIsDown(DOWN_ARROW)){
      player.y +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW)){
      player.x -=10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW)){
      player.x +=10
      player.update();
    }
    */

    drawSprites();
  }
  end(){
    console.log("game has ended");
  }
}