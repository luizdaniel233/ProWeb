function checked(currentValue, value) {
    if (currentValue == value && currentValue) {
        return "checked";
    } else {
        return "";
    }
}

function printError(errors, field){
    let msg;
    console.log(errors)
    if (typeof errors != "undefined") {

      errors.errors.forEach(function (error) {
        if (error.path === field) {
          msg = error.message;
          return;
        }
      });
      return msg;
    }
} 



module.exports = { checked, printError }