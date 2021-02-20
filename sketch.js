var balloon,database,balloonImg,balloonImg2
var backgroundImg;
var database,position

function preload(){
backgroundImg=loadImage(" Hot Air Ballon-01.png")
balloonImg=loadImage("Hot Air Ballon-02.png")
balloonImg2=loadImage("Hot Air Ballon-03.png")
}


function setup() {
  createCanvas(1500,700);
  balloon=createSprite(250,650,150,150)
  balloon.addImage(balloonImg)
    database=firebase.database();

  
var balloonPosition=database.ref('balloon/height')
 balloonPosition.on("value",readHeight,showError)
}

function draw() {

  background(backgroundImg);  
  textSize(30)
  fill("red")
  stroke("red")
  strokeWeight(1)
  text("PRESS ARROW KEYS TO MOVE THE BALLOON",100,100)
   if(keyDown(LEFT_ARROW)){
        balloon.x=balloon.x-10
    }
    else if(keyDown(RIGHT_ARROW)){
       balloon.x=balloon.x+10
    }
    else if(keyDown(UP_ARROW)){
       balloon.y=balloon.y-10
      //updateHeight(0,-10)
       balloon.addAnimation("hotAirBalloon",balloonImg2)
       balloon.scale=balloon.scale-0.005
    }
    else if(keyDown(DOWN_ARROW)){
       balloon.y=balloon.y+10
       balloon.scale=balloon.scale+0.005
    }
  drawSprites();
}

function updateHeight(x,y){
   database.ref('balloon/height').set({
      'x':height.x+x,
      'y':height.y+y
   })
}
function readHeight(data){
   height=data.val()
   balloon.x=height.x
   balloon.y=height.y
}
function showError(){
   console.log("Error.in writing to the database")
}