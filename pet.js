function randInt(min, max){
    // Generates random uniformly distributed integer between min and max
    return Math.round((max-min)*Math.random()+min);
}

class Pet {
    constructor(name, happiness=randInt(80,100), hunger=randInt(0,20)){
        this.name = name;
        this.happiness = happiness;
        this.hunger = hunger;
    }

    // Play with the pet
    play(toy){ 
        console.log(`\n${this.name} plays with their ${toy}...`);
        const addHappiness = Math.min(randInt(5,25), 100-this.happiness);
        this.happiness+=addHappiness;
        console.log(`\n --------------------------- \n`);
        console.log(`${this.name}\'s happiness has increased by ${addHappiness}%!`);
        this.getHungry();
    };

    // Pet loses random amount of hunger
    getHungry(){
        const addHunger = randInt(10,25);
        this.hunger+=addHunger;
        console.log(`Playing has made ${this.name} more hungry...`);
    };

    // Feed the pet
    feed(food){
        console.log(`\nYou feed ${this.name} ${food}...`);
        const removeHunger = Math.min(randInt(5,25), this.hunger);
        this.hunger-=removeHunger;
        console.log(`\n----------------------------- \n`);
        console.log(`${this.name}\'s hunger has decreased by ${removeHunger}%!`);
        this.enjoyMeal();
    };

    // Did pet enjoy the meal?
    enjoyMeal(){
        // Randomly determine if pet enjoyed meal and change happiness
        const enjoyed=Math.round(Math.random());
        let addHappiness;
        let removeHappiness;
        if (this.happiness === 100) {
            removeHappiness = randInt(-30,-10);
            console.log(`${this.name} really wants to play...`);
        } else if (enjoyed) {
            addHappiness = Math.min(randInt(1,10), 100-this.happiness);
            console.log(`${this.name} enjoyed their meal, happiness has gone up by ${addHappiness}%!`);
        } else {
            removeHappiness = randInt(-10,-1);
            console.log(`${this.name} disliked their meal, happiness has gone down by ${Math.abs(removeHappiness)}%!`);
        }
        this.happiness += (addHappiness || removeHappiness);
    };

    // Retrieve pet stats
    get happinessLevel(){ return this.happiness };
    get hungerLevel(){ return this.hunger };

};

module.exports = { Pet }