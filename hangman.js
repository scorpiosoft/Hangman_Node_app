"use strict";
var Word = require('./word');
var utility = require('./utility');

class Hangman
{
  // constructor method
  constructor(dictionary)
  {
    // all the words to choose from
    this.dictionary = dictionary;
    // Is the game started? true/false
    this.started    = false;
    // number of misses equalling GAME OVER
    this.game_over  = 6;
  }
  // method to start a new game
  start_game()
  {
    this.started = true;
    // current values in the game
    this.cur_correct = 0;
    this.misses_remaining = this.game_over;
    // arrays to store hits and misses, used only for duplicate protection
    this.a_hits = [];
    this.a_misses = [];
    // the word to guess
    this.word = new Word(this.random_word());
  }
  // method to get a random word
  random_word()
  {
    var rnd = Math.floor(Math.random() * this.dictionary.length);
    return this.dictionary[rnd];
  }
  // method to check the current guess vs the current word
  // depends on inquirer delivering a string
  guess(c)
  {
    // console.log('Hangman:guess:', c);

    var scratch = '';
    if (c.length > 1)
    {
      console.log("Please enter a single letter.  You entered [", c, "]");
      return;
    }
    if (!utility.isalpha(c))
    {
      console.log("Please enter a letter.  You entered [", c, "]");
      return;
    }
    if (this.word.guess(c))
    {
      // a hit
      scratch = this.a_hits.toString();
      // if a new hit, push it
      if (!scratch.includes(c))
        this.a_hits.push(c);
      // console.log('hits,', scratch);
    } else {
      // a miss
      scratch = this.a_misses.toString();
      // if a new miss, push it
      if (!scratch.includes(c))
      {
        this.a_misses.push(c);
        this.misses_remaining--;
        if (this.misses_remaining <= 0)
        {
          console.log('\n\nY O U . L O S E\n\n');
          console.log('The word was [', this.word.display(), ']\n\n');
          this.started = false;
        }
      }
      // console.log('misses,', scratch);
    }
    if (this.word.guessed)
    {
      console.log('\n\nY O U . W I N\n\n');
      this.started = false;
    }
  } // end guess
} // end Hangman

module.exports = Hangman;

//
// test statements
//

// var h = new Hangman(['frog','dog','cat']);
// h.start_game();
// h.guess('a');
// h.guess('t');
// h.guess('z');
// console.log(h.word);
