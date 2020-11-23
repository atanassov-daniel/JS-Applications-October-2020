const {
    assert
} = require("chai");

function isOddOrEven(string) {
    if (typeof (string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe("isOddOrEven", () => {
    it("If the passed parameter is NOT a string the function should return undefined. ", () => {
        let str1 = 123;
        let str2 = {
            'a': "ags"
        };
        let str3 = ['asd'];
        let str4 = false;

        assert.strictEqual(isOddOrEven(str1), undefined);
        assert.strictEqual(isOddOrEven(str2), undefined);
        assert.strictEqual(isOddOrEven(str3), undefined);
        assert.strictEqual(isOddOrEven(str4), undefined);
    });

    it("the function should return even when the length of the string is even", () => {
        let str1 = 'ab'; // length === 2
        let str2 = 'abcd'; // length === 4
        let str3 = 'abcdef'; // length === 6
        let str4 = '1abcdefghijklmnopqrstuvwxyz2abcdefghijklmnopqrstuvwxyz'; // length === 54

        assert.strictEqual(isOddOrEven(str1), "even");
        assert.strictEqual(isOddOrEven(str2), "even");
        assert.strictEqual(isOddOrEven(str3), "even");
        assert.strictEqual(isOddOrEven(str4), "even");
        assert.strictEqual(isOddOrEven(''), "even"); // length === 0
    });

    it("the function should return odd when the length of the string is odd", () => {
        let str1 = 'a'; // length === 1
        let str2 = 'abc'; // length === 3
        let str3 = 'abcde'; // length === 5
        let str4 = 'abcdefghijklmnopqrstuvwxyz2abcdefghijklmnopqrstuvwxyz'; // length === 53

        assert.strictEqual(isOddOrEven(str1), "odd");
        assert.strictEqual(isOddOrEven(str2), "odd");
        assert.strictEqual(isOddOrEven(str3), "odd");
        assert.strictEqual(isOddOrEven(str4), "odd");
        assert.strictEqual(isOddOrEven(' '), "odd"); // length === 1
    });
});