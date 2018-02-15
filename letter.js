// The Letter class
class Letter
{
  // constructor method
  constructor(letter)
  {
    this.the_letter = letter;
    // guessed == 0, not guessed
    // guessed == 1, freshly correct
    // guessed >  1, old correct guess
    this.guessed = 0;
  }
  // display method
  // return the letter if guessed, else underscore
  toString()
  {
    if (this.guessed)
      return this._the_letter;
    else
      return '_';
  }
  // guess method
  // check argument vs the letter, set guessed true if a match
  guess(letter)
  {
    // console.log('Letter:guess:  ' + this.the_letter);
    if (this.guessed === 1)
      this.guessed++; // ensure old correct guesses are marked as old
    if (letter === this.the_letter)
      this.guessed++;
    return this.guessed;
  }
  // setter method for the_letter
  set the_letter(v)
  {
    // validate the input
    if (v.length > 1)
    {
      console.log('Letters are a single character, yo!  You gave me [', v, ']');
      return;
    } else {
      this._the_letter = v;
    }
  }
  // getter method for the_letter
  get the_letter()
  {
    return this._the_letter;
  }
}

module.exports = Letter;

//
// test statements
//

// var too_long = new Letter('long');
// console.log('display:  ' + too_long + '\n', too_long);
// console.log('');

// var a = new Letter('a');
// console.log('display:  ' + a + '\n', a);
// a.guess('b');
// console.log('guess b, display:  ' + a + '\n', a);
// a.guess('a');
// console.log('guess a, display:  ' + a + '\n', a);
