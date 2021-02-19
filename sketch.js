
var trex,trex_running,trex_collided,ground,groundimg,invisibleground,cloudimg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameover,restart,gameoverImg,restartImg,count,jumpS,dieS,checkpointS,highestScore;

var CloudsGroup,ObstacleGroup

var GameState,PLAY,END



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  
  trex_collided = loadAnimation("trex_collided.png")
  
  groundimg = loadImage("ground2.png")
  
  cloudimg = loadImage("cloud.png")
  
  obstacle1 = loadImage("obstacle1.png")
  
  obstacle2 = loadImage("obstacle2.png")
  
  obstacle3 = loadImage("obstacle3.png")
  
  obstacle4 = loadImage("obstacle4.png")
  
  obstacle5 = loadImage("obstacle5.png")
  
  obstacle6 = loadImage("obstacle6.png")
  
  gameoverImg = loadImage("gameOver.png")
  
  restartImg = loadImage("restart.png")
  
  jumpS = loadSound("jump.mp3")
  
  dieS = loadSound("die.mp3")
  
  checkpointS = loadSound("checkPoint.mp3")
}



function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,350,20,50)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("Collided",trex_collided)
  trex.scale = 0.6
  
  ground = createSprite(200,375,400,10)
  ground.velocityX = -4
  ground.addImage(groundimg)
  
  invisibleground = createSprite(200,380,400,4)
  invisibleground.visible = false
  
  gameover = createSprite(200,150,10,10)
  gameover.addImage("gameover",gameoverImg)
  gameover.scale = 0.6;
  gameover.visible = false
  
  restart = createSprite(200,200,10,10)
  restart.addImage("restart",restartImg)
  restart.scale = 0.5;
  restart.visible = false
  
  CloudsGroup = new Group()
  ObstacleGroup = new Group()
  
  PLAY = 1
  END = 0
  GameState = 1
  
  count = 0
  highestScore = 0
}

function draw() {
  background(255);
  
  text("Score : " + count,300,50)
  
  text("Highest Score: "+ highestScore,50,50)
  
  if(GameState == PLAY){
    
    if(ground.x < 0){
    ground.x = 200
  }
    
    if(keyDown("Space") && trex.y > 340.8){
    trex.velocityY = -20
    jumpS.play();
  }
    
     trex.velocityY = trex.velocityY + 0.8
    
    Clouds();
  
    Obstacles();
    
    if(trex.isTouching(ObstacleGroup)){
      GameState = END
      dieS.play();
    }
    
    ground.velocityX = -4
    
    count = count + Math.round(getFrameRate()/60)
    
   if(count % 100 == 0 && count > 0){
     checkpointS.play()
   } 
    
    
  }
  
  else if(GameState == END){
    
    
    
    
    gameover.visible = true
    restart.visible = true
    
    
    ground.velocityX = 0
    
    trex.velocityY = 0;
    
    CloudsGroup.setVelocityXEach(0);
    CloudsGroup.setLifetimeEach(-1);
    ObstacleGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("Collided",trex_collided)
  }
  
  
  
  
  
  trex.collide(invisibleground)
  
  if(mousePressedOver(restart)){
     reset();
  }
  
  
 
  
   //console.log(trex.y)
  
  
  drawSprites();
}

function Clouds(){
  if(frameCount %60 == 0){
  clouds = createSprite(400,200,12,20)
  clouds.velocityX = -4
  clouds.addImage(cloudimg)
    var rand = Math.round(random(100,200))
    console.log(rand)
  clouds.y = rand
  clouds.scale = 0.7
  clouds.lifetime = 125
  CloudsGroup.add(clouds)
  }
}

function Obstacles(){
  if(frameCount % 80 == 0){
    obstacle = createSprite(400,350,12,10)
    obstacle.velocityX = -4
    var rand = Math.round((random(1,6)))
    obstacle.lifetime = 125
    
    
    /* if(rand == 1){
      obstacle.addImage(obstacle1)
    }
    else if(rand == 2){
      obstacle.addImage(obstacle2)
    } */
    
    switch(rand){
      case 1: obstacle.addImage(obstacle1)
        break;
      case 2: obstacle.addImage(obstacle2)
        break;
      case 3: obstacle.addImage(obstacle3)
        break;
      case 4: obstacle.addImage(obstacle4)
        break;
      case 5: obstacle.addImage(obstacle5)
        break;
      case 6: obstacle.addImage(obstacle6)
        break;
        default: break
    }
    ObstacleGroup.add(obstacle)
      obstacle.scale = 0.6
  }
}

function reset(){
  GameState = PLAY
  
  gameover.visible = false
  restart.visible = false
  
  trex.changeAnimation("running",trex_running)
  
  ObstacleGroup.destroyEach();
  
  CloudsGroup.destroyEach();
  
  if(highestScore < count){
    highestScore = count
  }
  
  count = 0
}




