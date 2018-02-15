var Hangman = require('./hangman');
var LineByLineReader = require('line-by-line');
var inquirer = require("inquirer");

// an instance of Hangman
var hangman = new Hangman();

//
// Synchronous reading of the 'words' dictionary file
// The .on() functions automatically begin processing when the script is invoked
//
var lr = new LineByLineReader('words', { encoding: 'ascii', skipEmptyLines: true });
var words = [];
// 'err' contains error object
lr.on('error', function (err)
{
  console.log('Error reading dictionalry file:', err);
});

// 'line' contains the current line without the trailing newline character.
lr.on('line', function (line)
{
  // console.log('pushing', line);
  words.push(line);
});

// All lines are read, file is closed now.
// NOTE - moved to Mainline Code
// lr.on('end', function ()
// {
//   have_dict = true;
// });

//
// Inquirer Functions
//

// function prompting for a new game
function prompt_start()
{
  inquirer
    .prompt(
    {
      name: "confirm",
      type: "confirm",
      message: "Would you like start a game of Hangman?",
      default: true
    })
    .then(function(answer)
    {
      if (answer.confirm)
      {
        hangman.start_game();
        prompt_guess();
      }
      return false;
    });
}

// function prompting for a new guess
function prompt_guess()
{
  var guess_str = '';
  for (var i = 0; i < hangman.a_misses.length; ++i)
    guess_str += hangman.a_misses[i] + ' ';
  // display the game state before the prompt
  // console.log(hangman.word);
  console.log('\n\nMisses before you lose:', hangman.misses_remaining);
  console.log('Your misses:', guess_str);
  console.log('\n   The word: ' + hangman.word + '\n');
  // only go while the word is not guessed
  // if (hangman.started)
  if (!hangman.word.guessed && hangman.started)
  {
    inquirer.prompt([
      {
        name: "guess",
        message: "What is your guess?"
      }
    ]).then(function(answer)
    {
      hangman.word.guess(answer.guess);
      // recurse the prompt
      prompt_guess();
    });
  } else {
    hangman.end_game();
    prompt_start();
  }
};

//
// Mainline Code
//
lr.on('end', function ()
{
  // All lines are read, file is closed now.
  // Can now proceed with the game.

  // instance of Hangman
  // hangman = new Hangman(words);
  hangman.dictionary = words;

  // prompt to start a game
  prompt_start();
});
