class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed = null;
        this.milk = loadImage("Milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    deductFood(){
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }
    getFedtime(lastFed){
        this.lastFed = lastFed;
    }
    display(){
        background(46,139,87);

        

        var x = 50,
            y = 100;

        imageMode(CENTER);
        image(this.milk, 630, 470, 100, 100);

        if(this.foodStock!=0){
            for(var i=0; i<this.foodStock; i++){
                if(i % 10 == 0){
                  x = 50;
                  y = y+90;
                }
                image(this.milk,x,y,100,100);
                x = x+50;
            }
        }
        fill("white");
        textSize(50);
        if (lastFed >= 12) {
            text("Last Feed : " + lastFed % 12 + " PM", 110, 70);
        } else if (lastFed == 0) {
            text("Last Feed : 12 AM", 110, 70);
        } else {
            text("Last Feed : " + lastFed + " AM", 110, 70);
        }
    }
    bedroom(){
        background(bedroomImg,550,500);
    }
    garden(){
        background(gardenImg,550,500);
    }
    washroom(){
        background(washroomImg,550,500);
    }
}
