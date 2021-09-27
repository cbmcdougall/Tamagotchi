function randInt(min, max){
    // Generates random integer between min and max
    return Math.round((max-min)*Math.random()+min);
}

class Pet {
    // Pets start off with 100% happiness and 0% hunger by default
    constructor(name, happiness=100, hunger=0){
        this.name = name;
        this.happiness = happiness;
        this.hunger = hunger;
    }

    // Play with the pet
    play(toy){ 
        console.log(`\n${this.name} plays with their ${toy}...`);
        const addHappiness = randInt(0,25);
        this.happiness+=addHappiness;
        console.log(`\n --------------------------- \n`);
        console.log(`${this.name}\'s happiness has increased by ${addHappiness}!`);
    };

    // Feed the pet
    feed(food){
        console.log(`\nYou feed ${this.name} ${food}...`);
        const removeHunger = randInt(0,25);
        this.hunger-=removeHunger;
        console.log(`\n----------------------------- \n`);
        console.log(`${this.name}\'s hunger has decreased by ${removeHunger}!`);
        this.enjoyMeal();
    };

    // Did pet enjoy the meal?
    enjoyMeal(){
        // Randomly determine if pet enjoyed meal and change happiness
        const enjoyment = randInt(-10,10);
        if (enjoyment > 0) {
            console.log(`${this.name} enjoyed their meal, giving them ${enjoyment} points of happiness!`);
        } else if (enjoyment < 0) {
            console.log(`${this.name} disliked their meal, losing them ${enjoyment} points of happiness!`);
        }
        this.happiness+=enjoyment;
    };

    // Retrieve pet stats
    get happinessLevel(){ return ` - happiness level: ${this.happiness}%` };
    get hungerLevel(){ return ` - hunger level: ${this.hunger}%` };

};

module.exports = { Pet }