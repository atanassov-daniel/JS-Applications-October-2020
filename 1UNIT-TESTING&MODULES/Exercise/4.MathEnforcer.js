const {
    assert
} = require("chai");

let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

// може би мога някак си да намаля броя на тестовете, като при тестовете със същите числа просто да направя променлива с числото и след този ред на следващите да тестват различните ф-ции просто с това число

describe("mathEnforcer object", () => {
    describe("addFive", () => {
        it("the function should return UNDEFINED if the parameter is NOT a number", () => {
            assert.strictEqual(mathEnforcer.addFive('789523789'), undefined);
        });
        it("should work with positive numbers", () => {
            assert.strictEqual(mathEnforcer.addFive(789523789), (789523789 + 5));
        });
        it("should work with negative numbers", () => {
            assert.strictEqual(mathEnforcer.addFive(-35986), (-35986 + 5)); // -35981
        });
        it("should work with floating-point numbers", () => { // ili puk -3592.2598762
            assert.approximately(mathEnforcer.addFive(-3597.2598762), (-3597.2598762 + 5), 0.01);
        });
    });

    describe("subtractTen", () => {
        it("the function should return UNDEFINED if the parameter is NOT a number", () => {
            assert.strictEqual(mathEnforcer.subtractTen('789523789'), undefined);
        });
        it("should work with positive numbers", () => {
            assert.strictEqual(mathEnforcer.subtractTen(789523), (789523 - 10));
        });
        it("should work with negative numbers", () => {
            assert.strictEqual(mathEnforcer.subtractTen(-35986), (-35986 - 10)); // -35996
        });
        it("should work with floating-point numbers", () => { // ili puk -3607.2598762
            assert.approximately(mathEnforcer.subtractTen(-3597.2598762), (-3597.2598762 - 10), 0.01);
        });
    });

    describe("sum", () => {
        it("the function should return UNDEFINED if any of the 2 parameters is NOT a number", () => {
            assert.strictEqual(mathEnforcer.sum('789523789', 235), undefined);
            assert.strictEqual(mathEnforcer.sum(-32.259, '789523789'), undefined);
        });
        it("should work with positive numbers", () => {
            assert.strictEqual(mathEnforcer.sum(789523, 273598), (789523 + 273598)); // 1063121
        });
        it("should work with negative numbers", () => {
            assert.strictEqual(mathEnforcer.sum(-35986, -9872), (-35986 - 9872)); // -45858
        });
        it("should work with floating-point numbers", () => { // ili puk -3607.2598762
            assert.approximately(mathEnforcer.sum(739.3547892, -3597.2598762), (-3597.2598762 + 739.3547892), 0.01); // -2857.905087
        });
    });
});