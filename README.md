# CLI Tamagotchi

A simple tamagotchi-like game in the command-line

## Installation & Usage

- Clone or download this repo.
- cd into this folder.
- run `npm install` to install dependencies.
- run `npm start` to begin the game!

## Current features

- User can name their pet.
- User can feed their pet, or play with them.
  - Feeding will decrease hunger level, but will slightly affect happiness level depending on meal enjoyment.
  - Playing will increase happiness level but will make the pet more hungry.
  - There is a random chance for an event to happen after each interaction, negatively impacting one of the pet's stats.
- User can check their pet's stats.
- User can exit the game via game options.
- User input is limited to the options, and will be reprompted if it does not match one of the options.
- User cannot feed/play with the pet if the stat cannot be improved further (happiness level 100% or hunger level 0%).

## Potential future features

- More random events!
- Repercussions if a stat reaches its worst value (e.g. 0% happiness or 100% hunger).
- More user interactions, possibly tying in with more random events.
