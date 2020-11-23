const assert = require("chai").assert;

rgbToHexColor = function (red, green, blue) {
    if (!Number.isInteger(red) || (red < 0) || (red > 255))
        return undefined; // Red value is invalid
    if (!Number.isInteger(green) || (green < 0) || (green > 255))
        return undefined; // Green value is invalid
    return "#" +
        ("0" + red.toString(16).toUpperCase()).slice(-2) +
        ("0" + green.toString(16).toUpperCase()).slice(-2) +
        ("0" + blue.toString(16).toUpperCase()).slice(-2);
};


describe("rgbToHexColor", () => {
    it("The function should return 'undefined' if any of the items is not of type Number", () => {
        let red = 'b';
        let green = {
            a: 10
        };
        let blue = "drunci";
        let test4 = [1, 2, 3];
        let test5 = false;


        //assert.strictEqual(Number.isInteger(test5), false);

        console.log(rgbToHexColor(blue, 2, 7));

        assert.strictEqual(rgbToHexColor(red, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(green, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(blue, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(test4, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(test5, 2, 7), undefined);
    });

    it("The function should return 'undefined' if any of the arguments is not in the allowed range [0-255]", () => {
        let red1 = -1;
        let red2 = 266;
        let blue1 = -1;
        let blue2 = 266;
        let green1 = -1;
        let green2 = 266;

        assert.strictEqual(rgbToHexColor(red1, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(red2, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(green1, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(green2, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(blue1, 2, 7), undefined);
        assert.strictEqual(rgbToHexColor(blue2, 2, 7), undefined);
    });

    it("check if the calculations for the end result are correct and complete", () => {
        let red = 0;
        let blue = 255;
        let green = 239;

        let expected = "#" +
            ("0" + red.toString(16).toUpperCase()).slice(-2) +
            ("0" + green.toString(16).toUpperCase()).slice(-2) +
            ("0" + blue.toString(16).toUpperCase()).slice(-2);

        let result = rgbToHexColor(red, green, blue);
        assert.strictEqual(result, expected);
    });

    describe("check the behaviour when one of the values is exactly [0] or [255]", () => {
        it("if the value of red is exactly [0] or [255] the function should work normally", () => {
            let green = 150;
            let blue = 150;

            let red1 = 0;
            let red2 = 255;

            assert.notStrictEqual(rgbToHexColor(red1, green, blue), undefined);
            assert.notStrictEqual(rgbToHexColor(red2, green, blue), undefined);

            // let expected = "#" +
            //     ("0" + red.toString(16).toUpperCase()).slice(-2) +
            //     ("0" + green.toString(16).toUpperCase()).slice(-2) +
            //     ("0" + blue.toString(16).toUpperCase()).slice(-2);

            // assert.strictEqual(rgbToHexColor(red, green, blue), expected);
        });

        it("if the value of green is exactly [0] or [255] the function should work normally", () => {
            let red = 150;
            let blue = 150;

            let green1 = 0;
            let green2 = 255;

            assert.notStrictEqual(rgbToHexColor(green1, red, blue), undefined);
            assert.notStrictEqual(rgbToHexColor(green2, red, blue), undefined);
        });

        it("if the value of blue is exactly [0] or [255] the function should work normally", () => {
            let red = 150;
            let green = 150;

            let blue1 = 0;
            let blue2 = 255;

            let result1 = rgbToHexColor(blue1, red, green);
            let result2 = rgbToHexColor(blue2, red, green);
            assert.notStrictEqual(result1, undefined);
            assert.notStrictEqual(result2, undefined);
        });
    });
});