var Word = require('./word');
var LineByLineReader = require('line-by-line');

//
// Synchronous processing of lines:
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
function random_word()
{
  var rnd = Math.floor(Math.random() * words.length);
  return words[rnd];
}

//
// Mainline Code
//
lr.on('end', function ()
{
  // All lines are read, file is closed now.
  // Can now proceed with the game.
  
  var rand_word = random_word();
  console.log(rand_word);
});