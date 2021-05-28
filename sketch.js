var PLAY=1;
var END=2;
var WAIT=0;
var gameState=WAIT;
var score=0;
var boy,gold,box,obs,weapon,bubble,playButton,weaponPos,point;
var weaponGroup,obsGroup,goldGroup;
var bg="1.png";
var boyimg,goldimg,boximg,weap1img,weap2img;
var obs1img,obs2img,obs3img,obs4img,obs5img,starfishimg;
var bubimg,playimg,gameimg,startimg;
var life=3;

var winSound,weaponSound,loseSound,playSound,coinSound,bubbleSound,normalSound;

function preload(){

  boyimg=loadAnimation("boy1.png","boy.png","boy1.png");
  goldimg=loadImage("gold.png");
  boximg=loadImage("box.png");
  weap1img=loadAnimation("w1.png","w2.png","w3.png");
  weap2img=loadAnimation("w5.png","w4.png");
  obs1img=loadImage("ene1.png");
  obs2img=loadImage("ene2.png");
  obs3img=loadImage("ene3.png");
  obs4img=loadImage("ene4.png");
  obs5img=loadImage("ene5.png");
  bubimg=loadImage("bubble.png");
  backgroundImg=loadImage(bg);
  playimg=loadImage("play.png");
  gameimg=loadImage("gameover.jpg");
  startimg=loadImage("preview.jpg");
  starfishimg=loadImage("starfish.png");
  pearlimg=loadImage("pearl.png");

  winSound=loadSound("win.wav");
  weaponSound=loadSound("weapon.wav");
  loseSound=loadSound("lose.wav");
  playSound=loadSound("plays.wav");
  coinSound=loadSound("coin (2).wav");
  normalSound=loadSound("normalsound.wav");
  coinSound=loadSound("bubbleSound.wav");


}

function setup(){
  createCanvas(1700,770);

  boy=createSprite(120,500,100,50);
  boy.addAnimation("swimming",boyimg);
  boy.scale=0.8;
  boy.visible=false;

  playButton=createSprite(1590,400,50,50);
  playButton.addImage(playimg);
  playButton.scale=0.3;

  weaponGroup=new Group();
  obsGroup=new Group();
  goldGroup=new Group();
  boxGroup=new Group();
  bubbleGroup=new Group();
  //normalSound.loop();
 
}

function draw(){
  
  background(startimg);

  if(mousePressedOver(playButton) && gameState===WAIT){
    playSound.play();
    gameState=PLAY;
  }
/*
  if(mousePressedOver(playButton)){
    playSound.play();
    gameState=PLAY;
  }
*/
  if(gameState===PLAY){

    background(backgroundImg);

    strokeWeight(10);
    textSize(40);
    fill("yellow");
    text("SCORE : "+ score,30,50);
    text("LIFE : "+life,30,80);

    boy.visible=true;
    playButton.visible=false;
    

    boy.y=World.mouseY; 
      
    if(keyDown("space")){
      weaponSound.play();
      createWeapon();     
    }

    if(boy.isTouching(obsGroup)){
     /* for(var i=0;i<obsGroup.maxDepth();i++){
        if(obsGroup.get(i)!==null){
          obsGroup.get(i).destroy();
        }
      }*/
      obsGroup.destroyEach();
      life--;
    }

    if(obsGroup.isTouching(weaponGroup)){
      obsGroup.destroyEach();
      weaponGroup.destroyEach();
      score+=2;
    }
/*
    for(var j=0;j<goldGroup.maxDepth();j++){
      if(goldGroup.get(j)!==null && boy.isTouching(goldGroup.get(j))){
        goldGroup.get(j).destroy();
        score+=5;
      }
    }*/

    if(boy.isTouching(goldGroup)){
      goldGroup.destroyEach();
      score+=5;
    }

    if(boy.isTouching(boxGroup)){
      boxGroup.destroyEach();
      score+=15;
    }
  
    if(life===0){
      gameState=END;
    }

    console.log(life);

    spawnBubble()
    createGold();
    createObs();
    createBox();
    
   
  }

  else if(gameState===END){

    strokeWeight(10);
    textSize(40);
    fill("yellow");
    text("SCORE : "+ score,30,50);

    background(gameimg);
    boy.destroy();
    bubbleGroup.destroyEach();
    goldGroup.destroyEach();
    boxGroup.destroyEach();
    weaponGroup.destroyEach();
    life=3;
    score=0;
    
  }
 
  drawSprites();
}

function createWeapon(){
  weapon=createSprite(250,200,15,15);
  weapon.velocityX=5;
  weaponPos=boy.y;
  weapon.y=weaponPos;
  var rand =Math.round(random(1,2));
  switch(rand){
    case 1:weapon.addAnimation("weapon1",weap1img); 
    weapon.scale=0.8;
    weapon.setCollider("circle",0,0,80);
    break;
    case 2:weapon.addAnimation("weapon2",weap2img);
    weapon.scale=0.3;
    break;
    default :break;
  }
  weapon.lifetime=300;
  weaponGroup.add(weapon);
}

function createObs(){
  if(frameCount%200===0){
    obs=createSprite(1700,random(20,700),15,15);
    obs.velocityX=-5;
    var rand =Math.round(random(1,5));
    switch(rand){
      case 1:obs.addImage("obs1",obs1img); 
      obs.scale=1;
      break;
      case 2:obs.addImage("obs2",obs2img);
      obs.scale=0.5;
      break;
      case 3:obs.addImage("obs3",obs3img); 
      obs.scale=0.4;
      break;
      case 4:obs.addImage("obs4",obs4img);
      obs.scale=0.5;
      break;
      case 5:obs.addImage("obs5",obs5img); 
      obs.scale=1.3;
      break;
      default :break;
    }
    obs.lifetime=370;
    obsGroup.add(obs);
 }
}
function createGold(){
  if(frameCount%450===0){
    gold=createSprite(1700,720,15,15);
    gold.velocityX=-3;
    gold.lifetime=530;
    var rand =Math.round(random(1,2));
    switch(rand){
      case 1:gold.addImage("point1",goldimg); 
             gold.scale=0.3;
      break;
      case 2:gold.addImage("point2",pearlimg);
             gold.scale=0.7;
      break;
      default :break;
  }
  goldGroup.add(gold);
}
}

function spawnBubble(){
  if(frameCount%20===0){
    bubble=createSprite(random(20,1700),700,15,15)
    bubble.addImage(bubimg);
    bubble.scale=0.1
    bubble.velocityY=-2
    boy.depth=bubble.depth;
    boy.depth=boy.depth+1   
    obsGroup.depth=bubble.depth;
    obsGroup.depth=obsGroup.depth+1
    bubbleGroup.add(bubble);
  }
}

function createBox(){
    if(frameCount%1000===0){
      box=createSprite(1700,720,15,15);
      box.addImage(boximg);
      box.scale=0.6;
      box.velocityX=-3;
      box.lifetime=500;
      boxGroup.add(box);
  }
}