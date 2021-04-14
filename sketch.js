var rocket, asteroid, alien, playagain
var rocketImage, asteroidImage, alienImage, restartImage
var spaceBackground, spaceImage, spaceImg2
var asteroid2, alien2
var asteroid2Img, alien2Img
var asteroid2Group, alien2Group
var score = 0

var PLAY = 1 
var END = 0
var gameState = PLAY 

var asteroidsGroup, alienGroup

function preload (){
  rocketImage = loadImage("Rocket.png");
  asteroidImage = loadImage("Asteroid.png");
  spaceImage = loadImage("Space.jpeg");
  alienImage = loadImage("Alien.png");
  restartImage = loadImage("playAgainButton2x.png")
  spaceImg2 = loadImage("Space2.png");


}
function setup() {
  createCanvas(800,400);

  spaceBackground = createSprite(600,600,300,300);
  
  spaceBackground.scale = 1;
  spaceBackground.y = spaceBackground.height /2;
  spaceBackground.velocityY = -4;

  rocket = createSprite(300, 500, 50, 50);
  rocket.addImage("Rocket",rocketImage);
  rocket.scale = 0.2;
 

  playAgain = createSprite(300,300,50,50);
  playAgain.addImage("playAgainButton2x", restartImage);
  playAgain.scale = 0.5;
  

  asteroidsGroup = new Group();
  alienGroup = new Group();
  
}

function draw() {
  createCanvas(600, 600);
  background(255,255,255); 
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    if(score < 50){
      playAgain.visible = false;
      spaceBackground.addImage("Space",spaceImage)
  spawnAsteroid();
  spawnAliens();

  
  if (keyCode === LEFT_ARROW) {
    rocket.velocityX = -3;
  }
  if (keyCode === RIGHT_ARROW) {
    rocket.velocityX = 3;
  }

  if (spaceBackground.y < 0 ){
    spaceBackground.y = spaceBackground.height/2;
  }


  if(rocket.isTouching(alienGroup)){
    score = score-100;
    alienGroup.destroyEach();
  }

  if(rocket.isTouching(asteroidsGroup)){
    gameState = END;
  }

    }
  else{
    if (keyCode === LEFT_ARROW) {
      rocket.velocityY = -3;
    }
    if (keyCode === RIGHT_ARROW) {
      rocket.velocityY = 3;
    }
  
    if (spaceBackground.x > 400 ){
      spaceBackground.x = spaceBackground.width/2;
    }
  
  
    if(rocket.isTouching(alienGroup)){
      score = score-100;
      alienGroup.destroyEach();
    }
  
    if(rocket.isTouching(asteroidsGroup)){
      gameState = END;
    }
      spaceBackground.addImage("Space2",spaceImg2);
      spaceBackground.x = spaceBackground.width/2
      spaceBackground.velocityX = 4;
  
  }
    
}

  if (gameState === END){

    playAgain.visible = true;

    spaceBackground.velocityY = 0;

    rocket.velocityX = 0;

    asteroidsGroup.destroyEach();
    alienGroup.destroyEach();

    asteroidsGroup.setVelocityYEach (0);
    alienGroup.setVelocityYEach (0);

    asteroidsGroup.setLifetimeEach(-1);
    alienGroup.setLifetimeEach(-1);

    

    if(mousePressedOver(playAgain)){
      reset();
    }
  }
  
  drawSprites();
  text("score:" + score,500,100)

  
}

function spawnAsteroid() {
  if(frameCount % 60 === 0 ){
  asteroid = createSprite(600, 0, 50, 50);
  asteroid.addImage("asteroid",asteroidImage);
  asteroid.x = (random(100,600));
  asteroid.velocityY = 4;
  asteroid.lifetime = 600;
  asteroid.scale = 0.1;
  asteroidsGroup.add(asteroid);
 
}
}

function spawnAliens(){
  if(frameCount % 170 === 0){
    alien = createSprite(600,0,50,50);
    alien.addImage("alien",alienImage)
    alien.x = (random(0,600));
    alien.velocityY = 4;
    alien.lifetime = 600;
    alien.scale = 0.25;
    alienGroup.add(alien);
  }
}

function spawnAsteroid2(){
  if (frameCount % 60 === 0)
  asteroid2 = createSprite(0,600,50,50)
  asteroid2.addImage("meteorite-clipart-6",asteroid2Img)
  asteroid2.y = (random(600,0))
  asteroid2.velocityX = 4
  asteroid2.lifetime = 600
  asteroid2.scale = 0.1
  asteroid2Group.add(asteroid2)
}

function spawnAliens2(){
  if(framecount % 160 === 0)
  alien2 = createSprite(0,600, 50,50)
  alien2.addImage("saucer",alien2Img)
  alien2.y =(random(600,0))
  alien2.velocityX = 4
  alien2.lifetime = 600
  alien2.scale = 0.2
  alien2Group.add(alien2)
}


function reset(){
  gameState = PLAY 
  asteroidsGroup.destroyEach();
  alienGroup.destroyEach();
  playAgain.visible = false;
  

  score = 0;
}