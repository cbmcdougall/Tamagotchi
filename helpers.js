function randInt(max, min=0){
    // Generates random uniformly distributed integer between min and max
    return Math.round((max-min)*Math.random()+min);
}

module.exports = { randInt };