var dog,happyDog,database,foodS,foodStock;
var notsmilingdog,smilingdog;
var fedTime,lastFed;
var foodObj,currentTime;
var bedroomImg,gardenImg,washroomImg;
var gameState,readState;

function preload(){

  notsmilingdog = loadImage("Dog.png");
  smilingdog = loadImage("happydog.png");

  bedroomImg = loadImage("Bed Room.png");
  gardenImg = loadImage("Garden.png");
  washroomImg = loadImage("Wash Room.png");

}

function setup() {
  createCanvas(1000,700);

  foodObj = new Food();

  dog = createSprite(750,350);
  dog.addImage(notsmilingdog);
  dog.scale = 0.4;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });
  
  feed = createButton("Feed the dog");
  feed.position(900, 90);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(1000, 90);
  addFood.mousePressed(addFoods);

}

function draw() {  

  currentTime=hour();
  if(currentTime===(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime===(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+5)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }else{
   feed.show();
   addFood.show();
   dog.addImage(notsmilingdog);
  }

  console.log(gameState);

  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(smilingdog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour(),
      gameState : "Hungry"
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
      Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}
