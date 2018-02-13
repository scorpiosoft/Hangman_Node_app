var Letter = require('./letter');

// the Word class
class Word
{
    // constructor method
  constructor(word)
  {
    this.the_word = [];
    var arr = word.split('');
    for (var i = 0; i < arr.length; ++i)
    {
      var l = new Letter(arr[i]);
      // multi-word 'words' are allowed in the Hangman game
      // so, spaces need to be auto guessed
      if (arr[i] === ' ')
        l.guessed = true;
      this.the_word.push(l);
    }
    this.guessed = false;
  }
  // display method
  // return the word
  display()
  {
    var out = '';
    for (var i = 0; i < this.the_word.length; ++i)
    {
      out += this.the_word[i].display();
    }
    return out;
  }
  // guess method
  // check argument vs the word, set guessed letters
  guess(letter)
  {
    // start out true
    var all_guessed = true;
    for (var i = 0; i < this.the_word.length; ++i)
    {
      // &= will keep true if the letter guess is true, else will change to false
      // once false, cannot be set true again
      all_guessed &= this.the_word[i].guess(letter);
    }
    this.guessed = all_guessed;
    return this.guessed;
  }
}

module.exports = Word;

//
// test statements
//

// var w = new Word('a word');
// console.log('display:', w.display(), w);
// w.guess('a');
// console.log('guess a, display:', w.display(), w);
// w.guess('d');
// console.log('guess a, display:', w.display(), w);
// w.guess('o');
// console.log('guess a, display:', w.display(), w);
// w.guess('w');
// console.log('guess a, display:', w.display(), w);
// w.guess('r');
// console.log('guess a, display:', w.display(), w);
