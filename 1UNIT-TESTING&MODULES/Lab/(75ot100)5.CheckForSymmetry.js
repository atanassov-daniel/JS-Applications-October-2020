// function isSymmetric(arr) {
//     if (!Array.isArray(arr))
//         return false; // Non-arrays are non-symmetric
//     let reversed = arr.slice(0).reverse(); // Clone and reverse
//     let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
//     return equal;
// }
isSymmetric = function (arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != reversed[i]) {
            return false;
        }
    }
    return true;
};

const assert = require("chai").assert;

describe("isSymmetric", () => {
    it("If the argument is not of type Array, return 'false'", () => {
        let test1 = "test";
        let test2 = true;
        let test3 = {
            a: 10
        };
        let test4 = 3;

        assert.strictEqual(isSymmetric(test1), false);
        assert.strictEqual(isSymmetric(test2), false);
        assert.strictEqual(isSymmetric(test3), false);
        assert.strictEqual(isSymmetric(test4), false);
    });

    it("If the passed in array is symmetric, return 'true'", () => {
        let test1 = [1, 2, 3, 3, 2, 1];
        let test2 = [3];

        assert.strictEqual(isSymmetric(test1), true);
        assert.strictEqual(isSymmetric(test2), true);
    });

    it("If the passed in array is not symmetric, return 'false'", () => {
        let test1 = [1, 2, 3, 3, 2];

        assert.strictEqual(isSymmetric(test1), false);
    });

    // it("If the passed in array is not symmetric, return 'true'", () => {
    //     let test1 = [1, 2, 3, 3, 2, 1];
    //     let reversed = test1.slice(0).reverse();

    //     assert.strictEqual(test1, reversed);
    // });

    it("If the passed in array is empty, return 'true'", () => {
        let test1 = [];

        assert.strictEqual(isSymmetric(test1), true);
    });

    it("If the passed in array is empty, return 'true'", () => {
        let test1 = [1, 2, 2, 1];

        assert.strictEqual(isSymmetric(test1), true);
    });
});