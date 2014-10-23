/**
 * Created with PhpStorm.
 * User: Krupnik
 * Date: 10/22/2014
 * Time: 9:31 PM
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
        buttons[index].addEventListener("click", btn_ckick, false);
    })(i);
    document.addEventListener("keypress", doc_keypress, false);

    function btn_ckick() {
        var btn = this.dataset.calc ? keysData[this.dataset.calc] : this.innerHTML;
        calculate(btn);
    }

    function doc_keypress(e) {
        if(e.type === "keypress" && keyCodes.indexOf(e.which) === -1) return;
        var key = e.which == 13 ? keysData["enter"] : String.fromCharCode(e.which);
        calculate(key);
    }

    function calculate(trigger) {
        var memory = document.getElementById("memory-input");
        var input = document.getElementById("calc-input");

        if(trigger === "c") { // clear button
            input.value = "";
            memory.innerHTML = "&nbsp;";
        } else if(operators.indexOf(trigger) > -1){ // operator button
            if(!input.value) return; // prevent double operations in a row
            memory.innerHTML = memory.innerHTML.indexOf("&nbsp;") === 0 ? // remove &nbsp; for eval that will occur later
            memory.innerHTML.slice(0,0) + input.value + trigger :
            memory.innerHTML + input.value + trigger;
            input.value = "";
        } else if(trigger === "=") { // evaluate
            if (!input.value || memory.innerHTML.indexOf("&nbsp") > -1) return; // return if no value stored in memory to evaluate
            input.value = eval(memory.innerHTML + input.value); // evaluate the memory string with input's value
            memory.innerHTML = "&nbsp;";
        } else if(trigger === "+/-") { // negate
            input.value = -input.value;
        } else if(trigger === "sqrt") { // sqrt
            if(input.value < 0 || isNaN(Math.sqrt(input.value))) { // prevent sqrt operation on negative values or show NaN
                alert("Sorry, wrong operation was used");
                return;
            }
            input.value = Math.sqrt(input.value);
        } else if(trigger === "del") { // erase last char
            input.value = input.value.slice(0, -1);
        } else { // default
            if(trigger === "." && input.value.indexOf(".") >= 0) return; // prevent adding 2 decimals
            input.value += trigger;
        }
    }
})();




