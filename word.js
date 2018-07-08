var minSpeed = 0.5;
var maxSpeed = 1;

function Word() {
    this.text = wordsData[Math.floor(Math.random() * wordsData.length)];
    this.x = getRandomInt(width, width + 1000);
    this.y = getRandomInt(1, 20) * 30;
    this.size = 24;
    this.width = textWidth(this.text);
    this.speed = getRandomFloat(minSpeed, maxSpeed);
    this.state = 'fly';
    this.color = colors[Math.floor(Math.random() * colors.length)];
}

Word.prototype.fly = function() {
    this.x -= this.speed;
}

Word.prototype.draw = function() {
    textAlign(LEFT);
    fill(this.setColor());
    textSize(this.size);
    textFont(fontWord);
    text(this.text, this.x, this.y);
}

// Take index as argument to dont create a new loop
Word.prototype.checkReset = function(index) {
    if (this.x < 0) {
        words.splice(index, 1);
        lifes--;
    }
}

Word.prototype.setColor = function() {
    return (this.state === 'fly') ? this.color : '#47682C';
}
