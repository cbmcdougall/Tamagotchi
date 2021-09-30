const autoBind = require('auto-bind');
const helpers = require('./helpers');

class Pet {
    constructor(name){
        this.name = name;
        this.happinessLevel = helpers.randInt(100,80);
        this.hungerLevel = helpers.randInt(20);
        autoBind(this);
    }
    
    // Getters and Setters
    get happiness(){ return this.happinessLevel };
    get hunger(){ return this.hungerLevel };
    set happiness(value){ this.happinessLevel = value }
    set hunger(value){ this.hungerLevel = value }

    // Play with the pet
    play(toy){ 
        console.log(`\n${this.name} plays with their ${toy}...`);
        const addHappiness = Math.min(helpers.randInt(25,5), 100-this.happiness);
        this.happiness += addHappiness;
        console.log(`\n --------------------------- \n`);
        console.log(`${this.name}\'s happiness has increased by ${addHappiness}%!`);
        this.getHungry();
    };

    // Feed the pet
    feed(food){
        console.log(`\nYou feed ${this.name} ${food}...`);
        const removeHunger = Math.min(helpers.randInt(25,5), this.hunger);
        this.hunger -= removeHunger;
        console.log(`\n----------------------------- \n`);
        console.log(`${this.name}\'s hunger has decreased by ${removeHunger}%!`);
        this.enjoyMeal();
    };

    // Pet loses random amount of hunger
    getHungry(){
        const addHunger = helpers.randInt(30,10);
        this.hunger += addHunger;
        console.log(`\n   ...${this.name} is getting hungry`);
    };

    // Pet loses random amount of happiness
    getSad(){
        const sadness = helpers.randInt(30,10);
        this.happiness -= sadness
        console.log(`\n   ...${this.name} really wants to play`);
    }

    // Did pet enjoy the meal?
    enjoyMeal(){
        // Randomly determine if pet enjoyed meal and change happiness
        const enjoyed=Math.round(Math.random());
        let addHappiness;
        let removeHappiness;
        if (this.happiness === 100) {
            this.getSad();
            return;
        } else if (enjoyed) {
            addHappiness = Math.min(helpers.randInt(10,1), 100-this.happiness);
            console.log(`${this.name} enjoyed their meal, happiness has gone up by ${addHappiness}%!`);
        } else {
            removeHappiness = helpers.randInt(-1,-10);
            console.log(`${this.name} disliked their meal, happiness has gone down by ${Math.abs(removeHappiness)}%!`);
        }
        this.happiness += (addHappiness || removeHappiness);
    };

};

module.exports = { Pet }