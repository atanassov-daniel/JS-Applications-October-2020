const assert = require("chai").assert;

createCalculator = function () {
    let value = 0;
    return {
        add: function (num) {
            value += Number(num);
        },
        subtract: function (num) {
            value -= Number(num);
        },
        get: function () {
            return value;
        }
    };
};

describe("createCalculator", () => {
    function removeAllWhitespaces(string) {
        while (string.indexOf(" ") !== -1) {
            string = string.replace(/\s/, "");
        }
        return string;
    }

    describe("check if the function returns an object containing the necessary functions", () => {
        it("Check if the return value of the function is of type object", () => {
            let funcReturnValue = createCalculator();

            assert.strictEqual(funcReturnValue instanceof Object, true);
        });

        it("check if all the necessary functions are there", () => {
            let funcReturnValue = createCalculator();

            assert.notStrictEqual(funcReturnValue.add, undefined, "function add is not contained in the object");
            assert.notStrictEqual(funcReturnValue.subtract, undefined, "function subtract is not contained in the object");
            assert.notStrictEqual(funcReturnValue.get, undefined, "function get is not contained in the object");
        });

        describe("check if the available functions really are what they should be", () => {
            it("check for the first function", () => {
                let funcReturnValue = createCalculator();

                let stringAdd = removeAllWhitespaces(funcReturnValue.add.toString());
                assert.strictEqual(stringAdd, "function(num){value+=Number(num);}");
            });

            it("check for the second function", () => {
                let funcReturnValue = createCalculator();

                let stringSubtarct = removeAllWhitespaces(funcReturnValue.subtract.toString());
                assert.strictEqual(stringSubtarct, "function(num){value-=Number(num);}");
            });

            it("check for the third function", () => {
                let funcReturnValue = createCalculator();

                let stringGet = removeAllWhitespaces(funcReturnValue.get.toString());
                assert.strictEqual(stringGet, "function(){returnvalue;}");
            });
        });
    });

    describe("check if the variable 'value' has been initialized and its value has been set to 0", () => {
        it("check if the variable 'value' has been initialized and its value has been set to 0", () => {
            let funcReturnValue = createCalculator();

            assert.strictEqual(funcReturnValue.get(), 0); // otherwise there is no value or no function 'get'

            funcReturnValue.add(0);
            funcReturnValue.subtract(0);
            assert.strictEqual(funcReturnValue.get(), 0);
        });
    });

    describe("check if the functions return correct answers", () => {
        it("first function and get function", () => {
            let funcReturnValue = createCalculator();

            funcReturnValue.add(739.57849302);
            let expected = 0 + 739.57849302;

            assert.strictEqual(funcReturnValue.get(), expected);
        });

        it("second function and get function", () => {
            let funcReturnValue = createCalculator();

            funcReturnValue.subtract(7399856.57849302);
            let expected = 0 - 7399856.57849302;

            assert.strictEqual(funcReturnValue.get(), expected);
        });
    });
});