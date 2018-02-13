// The Letter class
class Letter
{
  // constructor method
  constructor(letter)
  {
    this.the_letter = letter;
    this.guessed = false;
  }
  // display method
  // return the letter if guessed, else underscore
  display()
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
    if (letter === this.the_letter)
      this.guessed = true;
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
// console.log('display:', too_long.display(), too_long);
// console.log('');

// var a = new Letter('a');
// console.log('display:', a.display(), a);
// a.guess('b');
// console.log('guess b, display:', a.display(), a);
// a.guess('a');
// console.log('guess a, display:', a.display(), a);
