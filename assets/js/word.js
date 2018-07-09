const INITIAL_MIN_SPEED = 0.5;
const INITIAL_MAX_SPEED = 1;

var minSpeed = INITIAL_MIN_SPEED;
var maxSpeed = INITIAL_MAX_SPEED;

function Word() {
    this.text = game.getRandomWord();
    this.x = getRandomInt(width, width + 1000);
    this.y = getRandomInt(1, 20) * 30;
    this.size = 24;
    this.width = textWidth(this.text);
    this.speed = getRandomFloat(minSpeed, maxSpeed);
    this.state = 'flying';
    this.color = colors[Math.floor(Math.random() * colors.length)];
}

Word.prototype.fly = function() {
    this.x -= this.speed;
}

Word.prototype.draw = function() {
    textAlign(LEFT);
    fill(this.setColor());
    textSize(this.size);
    text(this.text, this.x, this.y);
}

// Take index as argument to dont create a new loop
Word.prototype.checkReset = function(index) {
    if (this.x < 0 && this.state === 'flying' ) {
        words.splice(index, 1);
        game.loseLife();
    }
}

Word.prototype.setColor = function() {
    return (this.state === 'flying') ? this.color : '#47682C';
}
