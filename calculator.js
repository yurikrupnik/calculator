/**
 * Created with PhpStorm.
 * User: Krupnik
 * Date: 10/18/2014
 * Time: 7:31 PM
 */

(function () {
    // no support for ie9-
    var buttons = document.querySelectorAll(".btn"),
        length = buttons.length,
        i,
        operators = ["+", "-", "*", "/"],
        keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers 0-9
                    13, 8, 42, 43, 45, 46, 47, 61]; // enter, backspace, *, +, -, ., /, =

    for (i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", calculate, false);
    })(i);
    document.addEventListener("keypress", calculate, false);

    function calculate(e) {
        if(e.type === "keypress" && keyCodes.indexOf(e.which) === -1) return;

        var input = document.getElementById("calc-input"),
            // btnValue dependency:
            // 1. if keypress event - check if enter key was pressed, assign "=" if true, get charCode if not
            // 2. for click event - check if button has glyphicon class, asign "del" if true, get button's inner html if not
            btnValue = (e.type === "keypress") ?
                (e.which == 13 ? "=" : String.fromCharCode(e.which)) :
                (this.className.indexOf("glyphicon-arrow-right") > -1 ? "del" : this.innerHTML);

        if(!calculate.memory) { // create memory property if does not exist to store strings to calculate
            calculate.memory = "";
        }

        if(btnValue === "c") { // clear button
            input.value = "";
            delete calculate.memory;
        } else if(operators.indexOf(btnValue) > -1){ // operator button
            if(!input.value) return; // return if operator pressed twice = input value is empty string
            calculate.memory = input.value + btnValue; // save to memory after math operation been pressed
            input.value = "";
        } else if(btnValue === "=") { // evaluate button
            if (!calculate.memory) return; // return if no value stored to evaluate
            calculate.memory += input.value;
            input.value = eval(calculate.memory); // evaluate the memory string and delete it
            delete calculate.memory;
        } else if(btnValue === "+/-") { // negate number
            input.value = -input.value;
        } else if(btnValue === "sqrt") { // sqrt button
            if(input.value < 0 || isNaN(Math.sqrt(input.value))) { // prevent sqrt operation on negative values or show NaN
                alert("Sorry, wrong operation was used");
                return;
            }
            input.value = Math.sqrt(input.value);
        } else if(btnValue === "del") { // erase last char button
            input.value = input.value.slice(0, -1);
        } else { // default buttons
            if(btnValue === "." && input.value.indexOf(".") >= 0) return; // prevent adding 2 decimals
            input.value += btnValue;
        }
    }
})();





