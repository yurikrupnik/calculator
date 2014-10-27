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
        memory = document.getElementById("memory-input"),
        input = document.getElementById("calc-input"),
        keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers 0-9
                    13, 42, 43, 45, 46, 47, 61],// enter, *, +, -, ., /, =
        math = function (operation) {
            if(!input.value) return; // prevent double operations in a row
            memory.innerHTML = memory.innerHTML.indexOf("&nbsp;") === 0 ? // remove &nbsp; for eval that will occur later
                memory.innerHTML.slice(0,0) + input.value + operation :
                memory.innerHTML + input.value + operation;
            input.value = "";
        },
        num = function (num) {
            input.value += num;
        },
        operations = {
            "=": function () {
                if (!input.value || memory.innerHTML.indexOf("&nbsp") > -1) return; // return if input value is empty string or if no value stored in memory to evaluate
                input.value = eval(memory.innerHTML + input.value); // evaluate the memory string with input's value
                memory.innerHTML = "&nbsp;";
            },
            "+/-": function () {
                input.value = -input.value;
            },
            "sqrt": function () {
                if(input.value < 0 || isNaN(Math.sqrt(input.value))) { // prevent sqrt operation on negative values or show NaN
                    alert("Sorry, wrong operation was used");
                    return;
                }
                input.value = Math.sqrt(input.value);
            },
            "delete": function () {
                input.value = input.value.slice(0, -1);
            },
            "c": function () {
                input.value = "";
                memory.innerHTML = "&nbsp;";
            },
            "+": math,
            "-": math,
            "/": math,
            "*": math,
            ".": function (dot) {
                if(dot === "." && input.value.indexOf(".") >= 0) return; // prevent adding 2 decimals
                input.value += dot;
            },
            "1": num,
            "2": num,
            "3": num,
            "4": num,
            "5": num,
            "6": num,
            "7": num,
            "8": num,
            "9": num,
            "0": num
        };

    function btn_click() {
        var btn = this.dataset.calc ? this.dataset.calc : this.innerHTML;
        operations[btn].call(null, btn);
    }

    function doc_keypress(e) {
        if(keyCodes.indexOf(e.which) === -1) return;
        var key = e.which == 13 ? "=" : String.fromCharCode(e.which); // special case for enter to act like as equal
        operations[key].call(null, key);
    }

    for (var i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", btn_click, false);
    })(i);
    document.addEventListener("keypress", doc_keypress, false);
})();





