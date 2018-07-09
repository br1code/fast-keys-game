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
        minSpeed *= 1.001;
        maxSpeed *= 1.001;
    }, 500);
}

function draw() {
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

// width / 2, height / 2 + 100
function mouseClicked() {
    
    game.handleClicks();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}