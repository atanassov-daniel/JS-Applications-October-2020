const {
    assert
} = require("chai");

function lookupChar(string, index) {
    if (typeof (string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}


describe("", () => {
    it("If the first passed parameter is NOT a string or the second is NOT a number the function should return undefined.", () => {
        let first = 123;
        let second1 = "123";
        let second2 = 1.5; // a floating-point number, not an integer

        assert.strictEqual(lookupChar(first, second1), undefined);
        assert.strictEqual(lookupChar(first, 5), undefined);
        assert.strictEqual(lookupChar('skajdfcv', second1), undefined);
        assert.strictEqual(lookupChar('skajdfcv', second2), undefined);
    });

    it("If the value of the index is incorrect the function should return 'Incorrect index'.", () => {
        let str = 'abcdefg123ads'; // length === 13

        let ind1 = 14; // a number bigger than the string length
        let ind2 = 13; // a number equal to the string length
        let ind3 = -1; // a negative number

        assert.strictEqual(lookupChar(str, ind1), "Incorrect index");
        assert.strictEqual(lookupChar(str, ind2), "Incorrect index");
        assert.strictEqual(lookupChar(str, ind3), "Incorrect index");
    });

    it("asfd", () => {
        let string1 = 'a';
        assert.strictEqual(lookupChar(string1, 0), "a");
        let string2 = 'abcdefg123ads'; // length === 13;
        assert.strictEqual(lookupChar(string2, 12), "s");
        //let string4 = '';
        //assert.strictEqual(lookupChar(string1, 0), "a");
        let string5 = '   ';
        assert.strictEqual(lookupChar(string5, 0), " ");
    });
});