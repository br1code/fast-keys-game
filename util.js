function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomFloat(min, max) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, 2);
    return Math.floor(rand*power) / power;
}