const {
    assert,
    expect
} = require("chai");

class Console {
    static get placeholder() {
        return /{\d+}/g;
    }

    static writeLine() {
        let message = arguments[0];
        if (arguments.length === 1) {
            if (typeof (message) === 'object') {
                message = JSON.stringify(message);
                return message;
            } else if (typeof (message) === 'string') {
                return message;
            }
        } else {
            if (typeof (message) !== 'string') {
                throw new TypeError("No string format given!");
            } else {
                let tokens = message.match(this.placeholder).sort(function (a, b) {
                    a = Number(a.substring(1, a.length - 1));
                    b = Number(b.substring(1, b.length - 1));
                    return a - b;
                });
                if (tokens.length !== (arguments.length - 1)) {
                    throw new RangeError("Incorrect amount of parameters given!");
                } else {
                    for (let i = 0; i < tokens.length; i++) {
                        let number = Number(tokens[i].substring(1, tokens[i].length - 1));
                        if (number !== i) {
                            throw new RangeError("Incorrect placeholders given!");
                        } else {
                            message = message.replace(tokens[i], arguments[i + 1]);
                        }
                    }
                    return message;
                }
            }
        }
    }
}

describe("class Console", () => {
    it("check if the class has the static method 'writeLine' ", () => {
        assert.notStrictEqual(Console.writeLine, undefined);
        assert.strictEqual(typeof Console.writeLine, "function");
    });

    describe("check the functionality when only one argument has been passed", () => {
        it("test the functionality of 'writeLine(string)' ", () => {
            let message = "dobro doshli, bratushki";
            assert.strictEqual(Console.writeLine(message), message);
        });

        it("test the functionality of 'writeLine(object)' ", () => {
            let message = {
                a: "abc",
                b: 10,
                c: {
                    d: false,
                    g: [1, 2, "sahdj", true]
                },
                func() {
                    console.log("krastavi4ka tur6iq");
                }
            };
            assert.strictEqual(Console.writeLine(message), JSON.stringify(message));
        });
    });


    describe("check the functionality of 'writeLine(templateString, parameters)' ", () => {
        it("test the functionality when the first argument is not a string", () => {
            expect(() => Console.writeLine(123, "abc", "adf")).to.throw(TypeError, "No string format given!");
        });

        it("when the number of placeholders is not equal to the number of arguments, the function should throw an error", () => {
            expect(() => Console.writeLine("The sum of {0} and {1} is {2}", "zero", "one")).to.throw(RangeError, "Incorrect amount of parameters given!");
        });

        it("when the index of a placeholder does not equal the number of arguments, the function should throw an error", () => {
            expect(() => Console.writeLine("The sum of {0} and {1} is {13}", "zero", "one", "thirteen")).to.throw(RangeError, "Incorrect placeholders given!");
        });

        it("the function should work properly when passed in a templateString and arguments, equal to the number of placeholders and with correct indexes", () => {
            assert.strictEqual(Console.writeLine("The sum of {0} and {1} is {2}", "3", "4", "7"), "The sum of 3 and 4 is 7");
        });
    });
});