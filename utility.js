//
// Utility Functions
//

// validate that a variable exists
// if a string, verify a length of at least 1 character
// return true if above is true, otherwise false
function validate_exists(v)
{
  if ((typeof v == 'undefined') || v == null || (typeof v == 'string' && (v.length <= 0)))
  {
    return false;
  }
  return true;
}

// utility function which returns true if an alpha char is passed in, otherwise false
// takes a string as an argument, works best with one character strings
function isalpha(str)
{
  var expr = /^[a-zA-Z]+$/;
  if(str.match(expr))
  {
    // console.log("[" + str  + "] is a letter");
    return true;
  } else
  {
    // console.log("[" + str  + "] is not a letter");
    return false;
  }
};

module.exports =
{
  validate_exists: validate_exists,
  isalpha: isalpha
};
