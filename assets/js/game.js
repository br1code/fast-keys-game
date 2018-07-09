const INITIAL_SCORE = 0;
const INITIAL_LIFES = 5;
const SCENE_PLAYING = 'playing';
const SCENE_OVER = 'over';

var words = [];
var wordTyped = '';

var game = function() {
    var public = {};
    var score = 0;
    var lifes = 5;
    var wordsTemp = wordsData.slice();
    var scene = SCENE_PLAYING;
    var playButtonColor = colorFonts.black;
    var submitButtonColor = colorFonts.black;

    function getScore() {
        return score;
    }

    function getLifes() {
        return lifes;
    }

    function loseLife() {
        lifes--;
    }

    function drawWords() {
        for (let i = words.length - 1; i >= 0; i--) {
            words[i].fly();
            words[i].draw();
            words[i].checkReset(i);
        }
    }

    function compareWords() {
        let sameWords = [];
        for (let i = 0; i < words.length; i++) {
            if (wordTyped === words[i].text) {
                sameWords.push({word: words[i], index: i});
            }
        }
        if (sameWords.length) {
            let sameWord = getNearestWord(sameWords);
            sameWord.word.state = 'dying';
            wordTyped = '';
            setTimeout(function() {
                words.splice(sameWord.index, 1);
                score++;
            }, 300);
        }
    }

    function drawUI() {
        textAlign(CENTER);
        fill('#100B00');
        // Draw word typed
        textSize(76);
        text(wordTyped, width / 2, height - 70);
        // Draw score
        textSize(42);
        text(score, 100, height - 70);
    }

    function handleKeys() {
        // Handle alphabetic letters
        if (keyCode === 8 && wordTyped.length) {
            wordTyped = wordTyped.slice(0, -1);
        } 
        // Handle delete character of word typed
        if (keyCode >= 65 && keyCode <= 90 || keyCode === 192) {
            wordTyped += String.fromCharCode(keyCode).toLowerCase();
        }
    }

    function getNearestWord(wordList) {
        return wordList.reduce(function(wordA, wordB) {
            if (wordA.word.x < wordB.word.x) {
                return wordA;
            } else {
                return wordB;
            }
        });
    }

    function getRandomWord() {
        // If the word list is empty, refill again
        if (!wordsTemp.length) wordsTemp = wordsData.slice();
        // Get a random word
        let newWord = wordsTemp[Math.floor(Math.random() * wordsTemp.length)];
        // Get the index of the word and remove it from the temp word list
        let wordIndex = wordsTemp.indexOf(newWord);
        wordsTemp.splice(wordIndex, 1);
        return newWord;
    }

    function drawGameOver() {
        background('#662C91');
        textAlign(CENTER);

        // Hover buttons and change colors
        let hoverPlayAgainButton = (mouseX > width / 2 - 120 && mouseX < width / 2 + 120 &&
            mouseY > height / 2 + 70 && mouseY < height / 2 + 110);

        if (hoverPlayAgainButton) {
            playButtonColor = colorFonts.hover;
        } else {
            playButtonColor = colorFonts.black;
        }

        // TEXTS
        fill(colorFonts.black);
        // Score
        textSize(48);
        text('Score   ' + score, width / 2, height / 2 - 130);
        // Game Over
        textSize(76);
        text('Game Over', width / 2, height / 2);

        // BUTTONS
        // Play again
        fill(playButtonColor);
        textSize(32);
        text('Play Again', width / 2, height / 2 + 100);
        // Play again
        fill(submitButtonColor);
        textSize(32);
        text('Submit Score', width / 2, height / 2 + 180);
    }

    function resetGame() {
        // global
        words = [];
        wordTyped = '';
        // local
        wordsTemp = wordsData.slice();
        score = INITIAL_SCORE;
        lifes = INITIAL_LIFES;
        scene = SCENE_PLAYING;
        // word
        minSpeed = INITIAL_MIN_SPEED;
        maxSpeed = INITIAL_MAX_SPEED;
    }

    function setScene() {
        if (lifes) {
            return scene = SCENE_PLAYING;
        } else {
            return scene = SCENE_OVER;
        }
    }

    function handleClicks() {
        if (scene === SCENE_OVER) {
            let hoverPlayAgainButton = (mouseX > width / 2 - 120 && mouseX < width / 2 + 120 &&
                mouseY > height / 2 + 70 && mouseY < height / 2 + 110);
            if (hoverPlayAgainButton) {
                resetGame();
            }
        } 
    }


    public = {
        getScore,
        getLifes,
        loseLife,
        drawWords,
        compareWords,
        drawUI,
        handleKeys,
        getNearestWord,
        getRandomWord,
        drawGameOver,
        resetGame,
        setScene,
        handleClicks
    };

    return public;
}();




