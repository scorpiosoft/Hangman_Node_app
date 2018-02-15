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
  // display method - for displaying the word when game is lost
  display()
  {
    var out = '';
    for (var i = 0; i < this.the_word.length; ++i)
    {
      out += this.the_word[i].the_letter;
    }
    return out;
  }
  // toString method
  // return the word
  toString()
  {
    var out = '';
    for (var i = 0; i < this.the_word.length; ++i)
    {
      out += this.the_word[i] + ' ';
    }
    return out;
  }
  // guess method
  // check argument vs the word, set guessed letters
  guess(letter)
  {
    // console.log('Word:guess:  ' + this.the_word);
    // the current letter's guess result
    var this_guess;
    // accumulate whether the curent guess is a new hit
    var a_hit = false;
    // accumulate whether the curent word is completely guessed
    var all_guessed = true;
    for (var i = 0; i < this.the_word.length; ++i)
    {
      this_guess = this.the_word[i].guess(letter);
      if (this_guess === 1)
        a_hit = true;
      if (this_guess === 0)
        all_guessed = false;
    }
    this.guessed = all_guessed;
    return a_hit;
  }
}

module.exports = Word;

//
// test statements
//

// var w = new Word('a word');
// console.log('display:  ' + w + '\n', w);
// w.guess('a');
// console.log('guess a, display:  ' + w + '\n', w);
// w.guess('d');
// console.log('guess a, display:  ' + w + '\n', w);
// w.guess('o');
// console.log('guess a, display:  ' + w + '\n', w);
// w.guess('w');
// console.log('guess a, display:  ' + w + '\n', w);
// w.guess('r');
// console.log('guess a, display:  ' + w + '\n', w);
