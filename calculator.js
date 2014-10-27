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
        operations = {
            "equal": function () { //
                if (!input.value || !memory.innerHTML) {
                    return; // return if input value is empty string or if no value stored in memory to evaluate
                }
                input.value = eval(memory.innerHTML + input.value); // evaluate the memory string with input's value
                memory.innerHTML = "";
            },
            "negate": function () {
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
            "clear": function () {
                input.value = "";
                memory.innerHTML = "";
            },
            "+": operate_math,
            "-": operate_math,
            "/": operate_math,
            "*": operate_math,
            ".": function (decimal) {
                if(decimal === "." && input.value.indexOf(".") >= 0) {
                    return; // prevent adding 2 decimals
                }
                input.value += decimal;
            },
            "1": add_num,
            "2": add_num,
            "3": add_num,
            "4": add_num,
            "5": add_num,
            "6": add_num,
            "7": add_num,
            "8": add_num,
            "9": add_num,
            "0": add_num
        };

    function operate_math(operation) {
        if(!input.value) {
            return; // prevent double operations in a row
        }
        memory.innerHTML = memory.innerHTML + input.value + operation;
        input.value = "";
    }
    function add_num(num) {
        input.value += num;
    }

    function btn_click() {
        var btn = this.dataset.calc ? this.dataset.calc : this.innerHTML;
        operations[btn](btn);
    }

    function doc_keypress(e) {
        if(keyCodes.indexOf(e.which) === -1) {
            return;
        }
        var key = e.which == 13 ? "equal" : String.fromCharCode(e.which); // special case for enter to act like as equal
        operations[key](key);
    }

    for (var i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", btn_click, false);
    })(i);
    document.addEventListener("keypress", doc_keypress, false);
})();





