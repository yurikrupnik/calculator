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
        operators = ["+", "-", "*", "/"];

    for (i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", calculate, false);
    })(i);

    function calculate(e) {
        var input = document.getElementById("calc"),
            btnValue = this.value;
        if(!calculate.memory) {
            calculate.memory = "";
        }

        if(btnValue === "c") { // clear button
            input.value = "";
            delete calculate.memory;
        } else if(operators.indexOf(btnValue) > -1){ // operator button
            if(!input.value) return; // return if operator pressed twice = input value is empty string
            calculate.memory = input.value + btnValue;
            input.value = "";
        } else if(btnValue === "=") { // eval button
            if (!calculate.memory) return;
            calculate.memory += input.value;
            input.value = eval(calculate.memory);
            delete calculate.memory;
        } else { // default buttons
            if(btnValue === input.value.substr(-1)) return; // prevent adding 2 decimals
            input.value += btnValue;
        }
    }
})();

// todo, add negate button, sqrt, erase last char




