var Hangman = require('./hangman');
var LineByLineReader = require('line-by-line');
var inquirer = require("inquirer");

// eventually will be an instance of Hangman
var hangman;

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
// Utility Functions
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
  console.log('\n\nMisses before you lose:', hangman.misses_remaining);
  console.log('Your misses:', guess_str);
  console.log('\n   The word:' + hangman.word + '\n');
  // only go while the word is not guessed
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
  hangman = new Hangman(words);

  // prompt to start a game
  prompt_start();

  // // check guess vs word
  // if (hangman.check(e_key))
  // {
  //   // if a new hit, display the guess in the word
  //   scratch = hangman.a_hits.toString();
  //   if (scratch.includes(e_key))
  //     return false; // not a new hit

  //   hangman.a_hits.push(e_key);
  //   // process the hit
  //   for (i = 0; i < hangman.cur_word.length; ++i)
  //   {
  //     idx = ((i+1)*2)-2;
  //     // need to rebuild the entire display string
  //     if (hangman.cur_word.charAt(i) === e_key)
  //     {
  //       hangman.cur_correct++; // increment correct count
  //       console.log("replacing position " + i, "idx", idx);
  //       // hangman.cur_display[((i+1)*2)-2] = e_key; // This would work in other languages.  Instead I have to add all sorts of extra logic to rebuild the string one piece at a time!!!
  //       if (i === 0)
  //         scratch = e_key;
  //       else
  //         scratch += " " + e_key;
  //     } else {
  //       if (i === 0)
  //         scratch = hangman.cur_display.charAt(0);
  //       else
  //         scratch += " " + hangman.cur_display.charAt(idx);
  //     }
  //   }
  //   hangman.cur_display = scratch;
  //   hangman.d_word.text(hangman.cur_display);
  //   console.log("cur_correct", hangman.cur_correct);
  //   hangman.play_sound(hangman.d_hit);
  // } else {
  //   // if a new miss, add the guess and increment the gallows
  //   scratch = hangman.a_misses.toString();
  //   if (scratch.includes(e_key_upper))
  //     return false; // not a new miss

  //   hangman.a_misses.push(e_key_upper);
  //   // display the new miss and gallows
  //   hangman.miss(e_key_upper);
  // }

  // // check for win or game over
  // if (hangman.cur_correct >= hangman.cur_word.length)
  // {
  //   hangman.end_game("Y O U . W I N");
  //   hangman.d_wins.text(++(hangman.wins) + " Wins");
  //   hangman.play_sound(hangman.d_win);
  // } else
  // if (hangman.cur_misses >= hangman.game_over)
  // {
  //   hangman.end_game("G A M E . O V E R");
  //   hangman.play_sound(hangman.d_game_over);
  // }

});
