var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgImg, invisibleGround;
var boyAnimation, boy;
var bulletImg, bulletGroup;

var gameOverImg, gameOver;

var monster1, monster2, monsterGroup;
var score= 0;


function preload(){
  bulletImg= loadImage("images/bullet.png");
  bgImg= loadImage("images/mountain.jpg");
  boyAnimation= loadAnimation("images/boy1.png","images/boy2.png");

  monster1= loadImage("images/monster1.png");
  monster2= loadImage("images/monster2.png");

  gameOverImg= loadImage("images/gameOver.png");
  //groundImg= loadImage("images/land.png");
}


function setup() {
  createCanvas(displayWidth-30, displayHeight-120);

  boy= createSprite(displayWidth/8,430);
  boy.addAnimation("animation",boyAnimation);
  boy.scale= 0.45;

  invisibleGround= createSprite(750,600,displayWidth,20);
  invisibleGround.visible= false;

  gameOver= createSprite(displayWidth/2, displayHeight/3, 10,10);
  gameOver.addImage(gameOverImg);
  gameOver.visible= false;


  monsterGroup = createGroup();
  bulletGroup = createGroup();

}


function draw() {
  background(bgImg);
  fill("black");
  textSize(30);
  text("Score:"+ score, displayWidth-200,50,100);

  if(gameState===PLAY){
    
    if(keyDown("space")){
      var bullet= bullets();
      bullet.addImage(bulletImg);
     }

     spawnMonsters();

     if(bulletGroup.isTouching(monsterGroup)){
       bulletGroup.destroyEach();
       monsterGroup.destroyEach();
       score= score+1;
     }
     if(monsterGroup.isTouching(boy)){
       gameState= END;
     }

  }
   else if(gameState===END){
     gameOver.visible= true;
     boy.destroy();
     monsterGroup.destroyEach();
     bulletGroup.destroyEach();
   }

  boy.collide(invisibleGround);
  monsterGroup.collide(invisibleGround);  


  //console.log(displayHeight);
  drawSprites();

}


function bullets(){
  bullet= createSprite(185,387,20,10);
  bullet.scale= 0.8;
  bullet.velocityX= 12;
  bulletGroup.add(bullet);
  return bullet;
   
}

function spawnMonsters(){
  if (frameCount % 80 === 0){
    var monster = createSprite(displayWidth,480,10,40);
    monster.velocityX = -8;

     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: monster.addImage(monster1);
               break;
       case 2: monster.addImage(monster2);
               break;
       default: break;
     }         
     monster.scale = 0.25;
     monster.lifetime = 300;

     monsterGroup.add(monster);
  }
 }