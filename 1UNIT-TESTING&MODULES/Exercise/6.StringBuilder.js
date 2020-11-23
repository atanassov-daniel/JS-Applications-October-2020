const {
    assert,
    expect
} = require("chai");

class StringBuilder {
    constructor(string) {
        if (string !== undefined) {
            StringBuilder._vrfyParam(string);
            this._stringArray = Array.from(string);
        } else {
            this._stringArray = [];
        }
    }

    append(string) {
        StringBuilder._vrfyParam(string);
        for (let i = 0; i < string.length; i++) {
            this._stringArray.push(string[i]);
        }
    }

    prepend(string) {
        StringBuilder._vrfyParam(string);
        for (let i = string.length - 1; i >= 0; i--) {
            this._stringArray.unshift(string[i]);
        }
    }

    insertAt(string, startIndex) {
        StringBuilder._vrfyParam(string);
        this._stringArray.splice(startIndex, 0, ...string);
    }

    remove(startIndex, length) {
        this._stringArray.splice(startIndex, length);
    }

    static _vrfyParam(param) {
        if (typeof param !== 'string') throw new TypeError('Argument must be string');
    }

    toString() {
        return this._stringArray.join('');
    }
}

// console.log(typeof new StringBuilder().append === "function");

// console.log(new StringBuilder('1'));


// obj.constructor && obj.constructor.toString().substring(0, 5) === 'class'
// console.log(new StringBuilder().constructor.name);
// console.log(new StringBuilder().constructor.toString().substring(0, 5) === "class");

describe("StringBuilder", () => {
    it("check if StringBuilder is a class", () => {
        assert.strictEqual(new StringBuilder().constructor.toString().substring(0, 5), "class");
    });

    it("check if StringBuilder has a static method called '_vrfyParam' and if it works as it should", () => {
        assert.notStrictEqual(StringBuilder._vrfyParam, undefined);

        //let expectedError = TypeError("Argument must be string");

        // expect(new StringBuilder('1')).not.to.throw(expectedError);
        expect(() => new StringBuilder(123456)).to.throw(TypeError, 'Argument must be string');

        // try {
        //     new StringBuilder(123456);
        // } catch (err) {
        //     // console.log(err.toString());
        //     // console.log(new TypeError("Argument must be string").toString());
        //     assert.strictEqual(err.toString(), new TypeError("Argument must be string").toString());
        // }
    });

    it("check if the constructor works as it should", () => {
        // if (string !== undefined) {
        //     StringBuilder._vrfyParam(string);
        //     this._stringArray = Array.from(string);
        // }
        let result1 = new StringBuilder(" hello"); // StringBuilder {_stringArray: Array(3)}

        assert.notStrictEqual(result1._stringArray, undefined);
        assert.strictEqual(result1._stringArray.length, 6);
        assert.strictEqual(result1._stringArray.join(''), " hello");


        //  else {
        // this._stringArray = [];
        // }
        let result2 = new StringBuilder();
        assert.notStrictEqual(result2._stringArray, undefined);
        assert.strictEqual(result2._stringArray.length, 0);

        // not sure exactly what should happen when an empty string has been passed
        let result3 = new StringBuilder("");
        assert.notStrictEqual(result3._stringArray, undefined);
        assert.strictEqual(result3._stringArray.length, 0);
    });

    it("check if all the necessary functions are to be found", () => {
        let res = new StringBuilder();
        assert.strictEqual(typeof res.append, "function");
        assert.strictEqual(typeof res.prepend, "function");
        assert.strictEqual(typeof res.insertAt, "function");
        assert.strictEqual(typeof res.remove, "function");
        assert.strictEqual(typeof res.toString, "function");
    });

    it("check if all the functions that have to throw an error when passed an invalid argument actually do so", () => {
        expect(() => new StringBuilder("abc").append(127)).to.throw(TypeError, 'Argument must be string');
        expect(() => new StringBuilder("abc").prepend(127)).to.throw(TypeError, 'Argument must be string');
        expect(() => new StringBuilder("abc").insertAt(1234567, 1)).to.throw(TypeError, 'Argument must be string'); // there is no need to check if the index is in range
    });

    it("test the remaining functionality of 'append'", () => { // throwing an error wwhen passed an invalid argument has already been tested in the upper 'it', for this reason I have written "the remaining functionality"
        let res = new StringBuilder("abc");
        // assert.strictEqual(res._stringArray.join(''), "abc");
        // assert.strictEqual(res._stringArray.length, 3);

        res.append("127");
        assert.strictEqual(res._stringArray.join(''), "abc127");
        assert.strictEqual(res._stringArray.length, 6);
    });

    it("test the remaining functionality of 'prepend'", () => {
        let res = new StringBuilder("abc");
        // assert.strictEqual(res._stringArray.join(''), "abc");
        // assert.strictEqual(res._stringArray.length, 3);

        res.prepend("127");
        assert.strictEqual(res._stringArray.join(''), "127abc");
        assert.strictEqual(res._stringArray.length, 6);
    });

    it("test the remaining functionality of 'insertAt'", () => {
        let res = new StringBuilder("user, hello");
        // assert.strictEqual(res._stringArray.join(''), "user, hello");
        // assert.strictEqual(res._stringArray.length, 11);

        res.insertAt("127", 5);
        assert.strictEqual(res._stringArray.join(''), "user,127 hello");
        assert.strictEqual(res._stringArray.length, 14);
    });

    it("test the functionality of 'remove'", () => { // there is no need to check if the index is in range
        let res = new StringBuilder("user,127 hello");
        // assert.strictEqual(res._stringArray.join(''), "user,127 hello");
        // assert.strictEqual(res._stringArray.length, 14); - реално това не е нужно, зашото ако имам стринг с тази дължина, който се състои от всички елементи на амсива съединени, то аз реално имплизитно вече съм направил тази проверка

        res.remove(5, 3);
        assert.strictEqual(res._stringArray.join(''), "user, hello");
        assert.strictEqual(res._stringArray.length, 11);
    });

    it("test the functionality of 'toString'", () => {
        let res = new StringBuilder("user,127 hello");
        assert.strictEqual(res.toString(), "user,127 hello");

        res.remove(5, 3);
        assert.strictEqual(res.toString(), "user, hello");
    });
});