var fontWord;

function preload() {
    fontWord = loadFont('assets/fonts/pixelart.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    setInterval(function() {
        words.push(new Word());
        minSpeed *= 1.005;
        maxSpeed *= 1.005;
    }, 1000);
}

function draw() {
    textFont(fontWord);
    let scene = game.setScene();
    if (scene === SCENE_PLAYING) {
        background(backgroundColors[game.getLifes() - 1]);
        game.drawWords();
        game.compareWords();
        game.drawUI();
    } else {
        game.drawGameOver();
    }
}

function keyPressed() {
    game.handleKeys();
}

function mouseClicked() {
    game.handleClicks();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}