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
        operators = ["+", "-", "*", "/"],
        keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers 0-9
                    13, 8, 42, 43, 45, 46, 47, 61], // enter, backspace, *, +, -, ., /, =
        keysData = { // can add more, if using icons instead of inner html text to identity the key with data-calc. for special cases now!
            "delete": "del",
            "enter": "="
        };

    for (var i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", calcHandler, false);
    })(i);
    document.addEventListener("keypress", calcHandler, false);

    function calcHandler(e) {
        if(e.type === "keypress" && keyCodes.indexOf(e.which) === -1) return;

        var memory = document.getElementById("memory-input");
        var input = document.getElementById("calc-input");
            // btnValue dependency:
            // 1. if keypress event - check if enter key was pressed, assign "=" if true, get charCode if not
            // 2. for click event - check if button has data.cal, asign the value from keysData object if true, get button's inner html if not
        var btnValue = (e.type === "keypress") ?
                (e.which == 13 ? keysData["enter"] : String.fromCharCode(e.which)) :
                (this.dataset.calc ? keysData[this.dataset.calc] : this.innerHTML);

        if(btnValue === "c") { // clear button
            input.value = "";
            memory.innerHTML = "&nbsp;";
        } else if(operators.indexOf(btnValue) > -1){ // operator button
            if(!input.value) return; // prevent double operations in a row
            memory.innerHTML = memory.innerHTML.indexOf("&nbsp;") === 0 ? // remove &nbsp; for eval that will occur later
                               memory.innerHTML.slice(0,0) + input.value + btnValue :
                               memory.innerHTML + input.value + btnValue;
            input.value = "";
        } else if(btnValue === "=") { // evaluate
            if (memory.length <= 1) return; // return if no value stored in memory to evaluate
            input.value = eval(memory.innerHTML + input.value); // evaluate the memory string with input's value
            memory.innerHTML = "&nbsp;";
        } else if(btnValue === "+/-") { // negate
            input.value = -input.value;
        } else if(btnValue === "sqrt") { // sqrt
            if(input.value < 0 || isNaN(Math.sqrt(input.value))) { // prevent sqrt operation on negative values or show NaN
                alert("Sorry, wrong operation was used");
                return;
            }
            input.value = Math.sqrt(input.value);
        } else if(btnValue === "del") { // erase last char
            input.value = input.value.slice(0, -1);
        } else { // default
            if(btnValue === "." && input.value.indexOf(".") >= 0) return; // prevent adding 2 decimals
            input.value += btnValue;
        }
    }
})();





