var words = [];
var wordTyped = '';

var game = {

    drawWords: function() {
        words.forEach(word => {
            word.fly();
            word.draw();
            word.updateDistance();
        });
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
            }, 300);
        }
    },

    drawWordTyped: function() {
        fill('#100B00');
        textSize(76);
        text(wordTyped, width / 2, height - 70);
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
            if (wordA.word.distance < wordB.word.distance) {
                return wordA;
            } else {
                return wordB;
            }
        });
    }
}




