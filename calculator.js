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
        mathOperations = ["+", "-", "*", "/"],
        keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // numbers 0-9
                    13, 8, 42, 43, 45, 46, 47, 61], // enter, backspace, *, +, -, ., /, =
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
            "+": math = function () {
                if(!input.value) return; // prevent double operations in a row
                memory.innerHTML = memory.innerHTML.indexOf("&nbsp;") === 0 ? // remove &nbsp; for eval that will occur later
                memory.innerHTML.slice(0,0) + input.value + this :
                memory.innerHTML + input.value + this;
                input.value = "";
            },
            "-": this.math,
            "/": this.math,
            "*": this.math,
            ".": function () {
                if(this === "." && input.value.indexOf(".") >= 0) return; // prevent adding 2 decimals
                input.value += this;
            },
            "1": num = function () {
                input.value += this;
            },
            "2": this.num,
            "3": this.num,
            "4": this.num,
            "5": this.num,
            "6": this.num,
            "7": this.num,
            "8": this.num,
            "9": this.num
        };

    function btn_ckick() {
        var btn = this.dataset.calc ? this.dataset.calc : this.innerHTML;
        operations[btn].call(btn); // this = btn atm, alternative call(null, btn) - add parameter to funcs that gonna use btn: math and num
    }

    function doc_keypress(e) {
        if(e.type === "keypress" && keyCodes.indexOf(e.which) === -1) return;
        var key = e.which == 13 ? "=" : String.fromCharCode(e.which);
        operations[key].call(key);
    }

    for (var i = 0; i < length; i++ ) (function (index) {
        buttons[index].addEventListener("click", btn_ckick, false);
    })(i);
    document.addEventListener("keypress", doc_keypress, false);
})();





