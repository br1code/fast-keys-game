var words = [];
var wordTyped = '';
var score = 0;
var lifes = 5;

var game = {

    drawWords: function() {
        for (let i = words.length - 1; i >= 0; i--) {
            words[i].fly();
            words[i].draw();
            words[i].checkReset(i);
        }
    },

    compareWords: function() {
        let sameWords = [];
        for (let i = 0; i < words.length; i++) {
            if (wordTyped === words[i].text) {
                sameWords.push({word: words[i], index: i});
            }
        }
        if (sameWords.length) {
            let sameWord = game.getNearestWord(sameWords);
            sameWord.word.state = 'dying';
            wordTyped = '';
            setTimeout(function() {
                words.splice(sameWord.index, 1);
                score++;
            }, 300);
        }
    },

    drawUI: function() {
        textAlign(CENTER);
        fill('#100B00');
        // Draw word typed
        textSize(76);
        text(wordTyped, width / 2, height - 70);
        // Draw score
        textSize(42);
        text(score, 100, height - 70);
    },

    handleKeys: function() {
        // Handle alphabetic letters
        if (keyCode === 8 && wordTyped.length) {
            wordTyped = wordTyped.slice(0, -1);
        } 
        // Handle delete character of word typed
        if (keyCode >= 65 && keyCode <= 90 || keyCode === 192) {
            wordTyped += String.fromCharCode(keyCode).toLowerCase();
        }
    },

    getNearestWord: function(wordList) {
        return wordList.reduce(function(wordA, wordB) {
            if (wordA.word.x < wordB.word.x) {
                return wordA;
            } else {
                return wordB;
            }
        });
    }
}




