// Get error number and message from query string
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

var errorNumber = getQueryVariable("error");
var errorMessage = getQueryVariable("message");

// errorMessage will only be a string if a query string is present.
// If a query string is present, there was an error. Format the message.
if (typeof errorMessage == "string") {
    errorMessage = errorMessage.replace("+", " ").replace("/", "");
}

// If both these exist, there was an error with the submission, write to page
if (errorNumber && errorMessage) {
    document.write("<h3 style='color:red'>An error occurred with your form submission</h3>",
        "<p style='color:red'>Error number: ", errorNumber, "</p>",
        "<p style='color:red'>Error message: ", errorMessage, "</p>");
}