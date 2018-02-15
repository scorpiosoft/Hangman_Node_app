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
  // method to end the current game
  end_game()
  {
      // if (!hangman.word.guessed || (hangman.misses < hangman.game_over))

    this.started = false;
  }
  // get a random word
  random_word()
  {
    var rnd = Math.floor(Math.random() * this.dictionary.length);
    return this.dictionary[rnd];
  }
  // method to check the current guess vs the current word
  // depends on inquirer delivering a string
  guess(c)
  {
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
    this.word.guess(c);
    // TODO - set started false when out of guesses
  }
  // method to do the actions when the player misses
  miss(c)
  {
    // use jQuery to dynamically add the miss
    var missed = $("<div>");
    missed.addClass("mono float-left pr-3");
    missed.text(c + " ");
    Hangman.d_guesses.append(missed);
    // increment miss count
    this.cur_misses++;
    // sanity check
    if (this.cur_misses > this.game_over)
    {
      alert("You are " + this.cur_misses + " times dead!");
      this.cur_misses = this.game_over;
    }
    this.set_gallows();
    this.d_gallows.attr('src', this.cur_gallows);
    this.play_sound(this.d_miss);
  }
}

module.exports = Hangman;
