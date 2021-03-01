var balloons,balloonImg1,balloonImg2
var database,height
function preload(){
  bg=loadImage("pro-C35 images/Hot Air Ballon-01.png")
  balloonImg1=loadAnimation("pro-C35 images/Hot Air Ballon-02.png")
  balloonImg2=loadAnimation("pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-02.png","pro-C35 images/Hot Air Ballon-02.png",
  "pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-03.png","pro-C35 images/Hot Air Ballon-04.png","pro-C35 images/Hot Air Ballon-04.png","pro-C35 images/Hot Air Ballon-04.png","pro-C35 images/Hot Air Ballon-04.png")
}
function setup() {
  database=firebase.database()

  createCanvas(1500,1000);
  balloons=createSprite(250, 650, 150, 150);
balloons.addAnimation("Balloon",balloonImg1)
balloons.scale=0.5
var ballonHeight=database.ref('Balloon/height')
ballonHeight.on("value",readHeight,showError)
}

function draw() {
  background(bg);  
  if (keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloons.addAnimation("Ballon",balloonImg2)
  }
  else if (keyDown(RIGHT_ARROW)){
    updateHeight(+10,0)
    balloons.addAnimation("Ballon",balloonImg2)
  }
  if (keyDown(DOWN_ARROW)){
    updateHeight(0,10)
    balloons.addAnimation("Ballon",balloonImg2)
  }
  else if (keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloons.addAnimation("Ballon",balloonImg2)
  }
  drawSprites();
  textSixe(25)
  text("Use Arrow Keys To Move The Balloons",50,50)
}
function updateHeight(x,y){
database.ref('Balloon/height').set({
  'x':height.x+x,'y':height.y+y
})
}
function readHeight(data){
  height=data.val()
  balloons.x=height.x
  balloons.y=height.y
}
function showError(){
  console.log("There is a Error")
}