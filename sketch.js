var play=1;
var end=0;
var hit=0;
var gamestate=play;
var score;
var monkey , monkey_running
var bananaImage, obstacleImage
var FoodGroup, obstacleGroup
var ground,inground;
var jungle,jungleImg;
function preload(){
jungleImg=loadImage("jungle.jpg");
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
}
function setup() {
createCanvas(400,400);
jungle=createSprite(200,200,400,400);
jungle.addImage(jungleImg);
score=0; 
ground=createSprite(200,390,400,10);
ground.visible=false;  
FoodGroup = new Group();
obstacleGroup = new Group();
monkey=createSprite(50,355,20,40);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1; 
monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug = true
inground=createSprite(200,390,400,10);
inground.visible=false; 
}
function draw() {
if(gamestate==play){
background("white");
if(monkey.isTouching(obstacleGroup)){
hit=hit+1;
obstacleGroup.destroyEach();
monkey.scale=0.1;
} 
if(hit==2){
gamestate=end;
}
jungle.velocityX=-4;
if(jungle.x<0){
jungle.x=jungle.width/2;
}
monkey.velocityY=monkey.velocityY+0.8;
if(keyDown("space")&& monkey.y>=220){
monkey.velocityY=-12;   
}
if(monkey.isTouching(FoodGroup)){
score=score+5;
FoodGroup.destroyEach();
}
if(score==10){
monkey.scale=0.12;   
}
if(score==20){
monkey.scale=0.14;    
} 
if(score==30){
monkey.scale=0.16;   
}  
if(score==40){
monkey.scale=0.18; 
}
if(score==48){
monkey.scale=0.2;   
}  
if(score==50){
gamestate=win;}
monkey.collide(inground);
bananas();
stone();
stroke("black");
textSize(15);
fill("black");
text("Score:" + score,150,50);
}
if(gamestate==end){
FoodGroup.destroyEach();
obstacleGroup.destroyEach();
monkey.destroy();
score=0;
jungle.velocityX=0
monkey.scale=0.1
}
console.log(gamestate);
drawSprites();
}
function bananas(){
if(frameCount%80===0){
var banana=createSprite(400,300,20,5);
banana.addImage(bananaImage);
banana.scale=0.08;
banana.velocityX=-4;
banana.y=Math.round(random(225,300));
banana.lifetime=110;
FoodGroup.add(banana);
 }  
}
function stone(){
if(frameCount%130===0){
var obstacle=createSprite(400,355,50,50);
obstacle.addImage(obstacleImage);
obstacle.scale=0.15;
obstacle.velocityX=-5;
obstacleGroup.add(obstacle);
obstacle.lifetime=90;
} 
}
function reset(){
gamestate=play;
background("white");
gameover.visible=false;
restart.visible=false;
monkey.velocityY=monkey.velocityY+0.8;
monkey=createSprite(50,355,20,40);
monkey.addAnimation("running",monkey_running);
monkey.scale=0.1;
monkey.collide(inground); 
bananas();
stone();
hit=0; 
stroke("black");
textSize(15);
fill("black");
text("Score:" + score,150,50);
}