const { Pet } = require('./pet');

// Using the built in readline module to get user input. prompt-sync or inquirer can give a cleaner experience.
const ui = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class UserInteraction {
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
                ui.question(`[Press enter to continue]\n`, () => this.petPage())
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
                        console.log('Please select an interaction');
                        setTimeout(() => this.petPage(), 1500);
                        break;
                }                
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    feedPet(pet){
        ui.question(`\nWhat would you like to feed to ${pet.name}?\n`, input => {
            try {
                pet.feed(input);
                ui.question(`\n[Press enter to continue]\n`, () => this.petPage())
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    playWithPet(pet){
        ui.question(`\nWhat toy would you like give ${pet.name} to play?\n`, input => {
            try {
                pet.play(input);
                ui.question(`\n[Press enter to continue]\n`, () => this.petPage())
            } catch (err) {
                this.handleError(err);
            }
        });
    };

    checkStats(pet){
        console.log(`\n${pet.name}\'s stats:`);
        console.log(pet.happinessLevel);
        console.log(pet.hungerLevel);
        ui.question(`\n[Press enter to continue]\n`, () => this.petPage())
    }

    handleError(err){
        console.log('\n', err.message, '\n'); // Experiment with err, err.name, err.message, err.stack
        ui.close();
    }

};

module.exports = { UserInteraction }