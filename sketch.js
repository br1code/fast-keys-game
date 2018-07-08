var fontWord;

function preload() {
    fontWord = loadFont('assets/pixelart.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setInterval(function() {
        words.push(new Word());
    }, 1000);

    setInterval(function() {
        minSpeed *= 1.002;
        maxSpeed *= 1.002;
    }, 500);
}

function draw() {
    if (lifes) {
        background(backgroundColors[lifes - 1]);
        game.drawWords();
        game.compareWords();
        game.drawUI();
    }
}

function keyPressed() {
    game.handleKeys();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}