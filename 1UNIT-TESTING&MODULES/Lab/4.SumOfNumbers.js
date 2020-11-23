function sum(arr) {
    let sum = 0;
    for (num of arr) sum += Number(num);
    return sum;
}

module.exports = sum;

const assert = require("chai").assert;
// const sum = require("./4.SumOfNumbers");

describe("Sum", function () {
    it("Should return a positive number when used with an array of only positive numbers", () => {
        let arr = [0, 1, 2, 3, 4];

        let expected = 0 + 1 + 2 + 3 + 4;

        assert.equal(sum(arr), expected);
    });

    it("Should return a positive number when used with an array of positive numbers and one smaller than them negative number", () => {
        let arr = [-1, 1, 2, 3, 4];

        let expected = -1 + 1 + 2 + 3 + 4;

        assert.equal(sum(arr), expected);
    });

    it("Should return 0 when provided with an empty array", () => {
        let arr = [];

        let expected = 0;

        assert.equal(sum(arr), expected);
    });
});