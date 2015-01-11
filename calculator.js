/**
 * Created with PhpStorm.
 * User: Krupnik
 * Date: 10/18/2014
 * Time: 7:31 PM
 */

(function () {
    //no support for ie9-
    var buttons = document.querySelectorAll(".btn"),
        length = buttons.length,
        memory = document.getElementById("memory-input"),
        input = document.getElementById("calc-input"),
        operations = {
            "equal": function () {
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
                if (input.value < 0 || isNaN(Math.sqrt(input.value))) { // prevent sqrt operation on negative values or show NaN
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
            ".": add_decimal,
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
        },
        keydownMap = {
            8: operations.delete, // backspace
            27: operations.clear, // esc
            13: operations.equal, // enter
            187: operations.equal, // = near the backspace
            78: operations.negate, // n
            83: operations.sqrt // s
        };

    function operate_math(operation) {
        if (!input.value) {
            return; // prevent double operations in a row
        }
        memory.innerHTML = memory.innerHTML + input.value + operation;
        input.value = "";
    }

    function add_num(num) {
        input.value += num;
    }

    function add_decimal(decimal) {
        if (decimal === "." && input.value.indexOf(".") >= 0) {
            return; // prevent adding 2 decimals
        }
        input.value += decimal;
    }

    function btn_click() {
        var btn = this.value ? this.value : this.innerHTML;
        this.blur(); // blur the clicked button for eval via enter
        operations[btn](btn);
    }

    function doc_keypress(e) {
        var key = String.fromCharCode(e.which);
        if (operations[key]) {
            operations[key](key);
        }
    }

    function doc_keydown(e) {
        if (!keydownMap[e.which]) {
            return;
        }
        keydownMap[e.which]();
        e.preventDefault();
    }

    for (var i = 0; i < length; i++) (function (index) {
        buttons[index].addEventListener("click", btn_click, false);
    })(i);
    document.addEventListener("keypress", doc_keypress, false);
    document.addEventListener("keydown", doc_keydown, false);
})();




