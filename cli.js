const helpers = require('./helpers');
const { Pet } = require('./pet');

// Using the built in readline module to get user input. prompt-sync or inquirer can give a cleaner experience.
const ui = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class UserInterface {
    run(){
        console.clear();
        this.homePage();
    }

    homePage(){
        console.log(`\n=================== Welcome to CLI Tamagochi! ===================\n`);
        console.log(`= Here you can create and care for your very own tamagochi pet! =\n`);
        console.log(`=================================================================\n`);
        ui.question('\n--- Begin by naming your new pet!\n', input => {
            try {
                this.pet = new Pet(input[0].toUpperCase() + input.slice(1));
                console.log(`\nYou have now created a pet called ${this.pet.name}, be sure to look after it!`);
                this.returnToPetPage();
            } catch(err) {
                this.handleError(err);
            }
        })
    };
    
    petPage(){
        console.clear();
        const pet = this.pet;
        console.log(`\nWhat would you like to do?`);
        ui.question(` - [Feed] ${pet.name}\n - [Play] with ${pet.name}\n - [Check] ${pet.name}\'s stats\n - [Exit]\n`, input => {
            try {
                switch (input.toLowerCase()) {
                    case "feed":
                        this.feedPet(pet);
                        break;
                    case "play":
                        this.playWithPet(pet);
                        break;
                    case "check":
                        this.checkStats(pet);
                        break;
                    case "exit":
                        ui.close();
                        break;
                    default:
                        setTimeout(() => console.log('Please select an interaction'), 0);
                        this.petPage();
                        break;
                }
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    feedPet(pet){
        if (pet.hungerLevel === 0) {
            console.log(`\n${pet.name} isn't hungry!`);
            this.returnToPetPage();
        }
        ui.question(`\nWhat would you like to feed to ${pet.name}?\n`, input => {
            try {
                pet.feed(input);
                this.randomEvent(pet);
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    playWithPet(pet){
        if (pet.happinessLevel === 100) {
            console.log(`\n${pet.name} doesn't want to play!`);
            this.returnToPetPage();
        }
        ui.question(`\nWhat toy would you like give ${pet.name} to play?\n`, input => {
            try {
                pet.play(input);
                this.randomEvent(pet);
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    checkStats(pet){
        console.log(`\n${pet.name}\'s stats:`);
        console.log(` - happiness level: ${pet.happiness}%`);
        console.log(` - hunger level: ${pet.hunger}%`);
        this.returnToPetPage();
    }

    randomEvent(pet) {
        // Determine if random event happens
        const ranNum = helpers.randInt(4,1);
        const eventHappens = Math.floor(ranNum/4);   // 25% chance 
        console.log(eventHappens);
        if (eventHappens) {
            console.log(`\n...wait, something is happening!`);
            // Randomly choose an event to occur
            const events = [pet.getHungry, pet.getSad];
            const selector = Math.floor(Math.random()*events.length);
            const selectedEvent = events[selector];
            selectedEvent();
        }
        this.returnToPetPage()
    }

    returnToPetPage(){
        ui.question(`\n[Press enter to continue]\n`, () => this.petPage());
    }

    handleError(err){
        console.log('\n', err.message, '\n');
        ui.close();
    }

};

module.exports = { UserInterface }