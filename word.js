var minSpeed = 0.5;
var maxSpeed = 1;

function Word() {
    this.text = wordsData[Math.floor(Math.random() * wordsData.length)];
    this.x = getRandomInt(width, width + 1000);
    this.y = getRandomInt(1, 20) * 30;
    this.size = 24;
    this.width = textWidth(this.text);
    this.speed = getRandomFloat(minSpeed, maxSpeed);
    this.distance = this.x + this.width;
    this.state = 'fly';
    this.color = colors[Math.floor(Math.random() * colors.length)];
}

Word.prototype.fly = function() {
    if (this.x < -this.width) {
        this.resetPos();
    }
    this.x -= this.speed;
}

Word.prototype.draw = function() {
    fill(this.setColor());
    textSize(this.size);
    textFont(fontWord);
    text(this.text, this.x, this.y);
}

Word.prototype.resetPos = function() {
    this.x = getRandomInt(width, width + 300);
    this.y = getRandomInt(0, height);
}

Word.prototype.setColor = function() {
    return (this.state === 'fly') ? this.color : '#47682C';
}

Word.prototype.updateDistance = function() {
    this.distance = this.x + this.width;
}