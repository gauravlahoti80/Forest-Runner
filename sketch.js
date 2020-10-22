var monkey , monkey_running, bg, bgi;
var banana ,bananaImage, obstacleImage, ig;
life = 0;
score = 300;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bg = loadImage("forest.bg.jpg");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400,318);
  
  bgi = createSprite(200,150,10,10);
  bgi.addImage(bg);
  bgi.scale=2;
  
  
  monkey = createSprite(20,260,10,10);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale = 0.1;
  
  ig = createSprite(200,300,400,10);
  ig.visible = false;

  
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
}



function draw() {
  background(220);
  
  
  monkey.collide(ig);
  
  bgi.velocityX = -3;
  if (bgi.x < 100)
    {
   bgi.x = bgi.width/2;
   }
  if (obstaclegroup.isTouching(monkey))
    {
      gameState = END;
      monkey.visible = false;
   }
  
  if (score < 280 )
    {
      obstaclegroup.velocityX = -20;
      bananagroup.velocityX = -12
    }
if(keyDown("space")&& monkey.y >= 130) {
      monkey.velocityY = -12;
}
    monkey.velocityY = monkey.velocityY + 1.7;
  
  if (gameState === PLAY)
    {
      
      monkey.visible = true;
      if (bananagroup.isTouching(monkey))
    {
      score = score - 1;
      
     
    }
   
  
    
  
  }
  if (gameState === END)
  {
    if (keyDown("r")){
    gameState = PLAY
  }
    life =0;
    score = 300;
    monkey.visible = false;
    bgi.velocityX = 0;
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
    bananagroup.setVelocityXEach(0)
    bananagroup.destroyEach();
    obstaclegroup.destroyEach();
    
    
  }
   

  monkey.debug = false;
  
  
  
  drawSprites();
  
  textFont("Impact");
  textSize(20);
  fill("black")
  text("Forest Runner",140,20);
  
  textFont("Forte");
  textSize(18);
  fill("black")
  text("Survival Time: " + life,265,312);
  
  textFont("Forte");
  textSize(18);
  fill("black")
  life = Math.ceil(frameCount/frameRate())
  text("Monkey Left Hungry: " + score,5,312);
  
  if (gameState === END)
    {
      textSize(20);
      fill("brown")
      text("Press R to Restart",120,158.5)
    }
  if (score === 0)
    {
      gameState = END;
    }      
  
  fruits();
  banana();
}

function fruits()
{
  if (frameCount % 60 === 0)
{
      var obstacle  = createSprite(400,270,110,20);
      obstacle.scale=0.1;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        obstacle.addImage(obstaceImage);
        }
  else {
    obstacle.addImage(obstaceImage)
  }
  obstacle.collide(ig);
  obstacle.velocityX=-7;
  obstacle.setLifetime=100;
  obstaclegroup.add(obstacle);
} 
}

function banana()
{
  if (frameCount % 40 === 0)
{
     var banana  = createSprite(400,200);
      banana.scale=0.1;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        banana.addImage(bananaImage);
        }
  else {
    banana.addImage(bananaImage);
  }
  if (life > 5)
    {
      bananagroup.velocityX = -15
    }
  banana.y =Math.round(random(50,210));
  banana.collide(ig);
  banana.velocityX=-7;
  banana.setLifetime=100;
  bananagroup.add(banana);
} 
}