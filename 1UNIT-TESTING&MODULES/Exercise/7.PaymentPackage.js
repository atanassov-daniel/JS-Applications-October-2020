const {
    assert,
    expect
} = require("chai");

class PaymentPackage {
    constructor(name, value) {
        this.name = name;
        this.value = value;
        this.VAT = 20; // Default value    
        this.active = true; // Default value
    }

    get name() {
        return this._name;
    }

    set name(newValue) {
        if (typeof newValue !== 'string') {
            throw new Error('Name must be a non-empty string');
        }
        if (newValue.length === 0) {
            throw new Error('Name must be a non-empty string');
        }
        this._name = newValue;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('Value must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('Value must be a non-negative number');
        }
        this._value = newValue;
    }

    get VAT() {
        return this._VAT;
    }

    set VAT(newValue) {
        if (typeof newValue !== 'number') {
            throw new Error('VAT must be a non-negative number');
        }
        if (newValue < 0) {
            throw new Error('VAT must be a non-negative number');
        }
        this._VAT = newValue;
    }

    get active() {
        return this._active;
    }

    set active(newValue) {
        if (typeof newValue !== 'boolean') {
            throw new Error('Active status must be a boolean');
        }
        this._active = newValue;
    }

    toString() {
        const output = [
            `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${this.value}`,
            `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
        ];
        return output.join('\n');
    }
}


describe("PaymentPackage", () => {
    it("check if the constructor works properly with correct data", () => {
        let res = new PaymentPackage('abc', 0);

        assert.strictEqual(res._name, 'abc');
        assert.strictEqual(res._value, 0);
        assert.strictEqual(res._VAT, 20);
        assert.strictEqual(res._active, true);
    });

    it("test the functionality of set '_name' ", () => {
        expect(() => new PaymentPackage(123, 2)).to.throw(Error, 'Name must be a non-empty string');
        expect(() => new PaymentPackage('', 2)).to.throw(Error, 'Name must be a non-empty string');

        expect(() => new PaymentPackage('abc', 2).name = '').to.throw(Error, 'Name must be a non-empty string');
        expect(() => new PaymentPackage('abc', 2).name = 2).to.throw(Error, 'Name must be a non-empty string');
    });

    it("test the functionality of set '_value' ", () => {
        expect(() => new PaymentPackage('abc', '-1')).to.throw(Error, 'Value must be a non-negative number');
        expect(() => new PaymentPackage('abc', -1)).to.throw(Error, 'Value must be a non-negative number');

        expect(() => new PaymentPackage('abc', 0).value = '-1').to.throw(Error, 'Value must be a non-negative number');
        expect(() => new PaymentPackage('abc', 0).value = -1).to.throw(Error, 'Value must be a non-negative number');
    });

    it("test the functionality of set '_VAT' ", () => {
        let res = new PaymentPackage('abc', 2);

        expect(() => res.VAT = '-12').to.throw(Error, 'VAT must be a non-negative number');
        expect(() => res.VAT = -1).to.throw(Error, 'VAT must be a non-negative number');
    });

    it("test the functionality of set '_active' ", () => {
        let res = new PaymentPackage('abc', 2);

        expect(() => res.active = '-12').to.throw(Error, 'Active status must be a boolean');
        expect(() => res.active = -1).to.throw(Error, 'Active status must be a boolean');
    });

    it("test the functionality of the method 'toString' ", () => {
        let res = new PaymentPackage('abc', 2);

        let expected = [`Package: ${res.name}` + (res.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${res.value}`,
            `- Value (VAT ${res.VAT}%): ${res.value * (1 + res.VAT / 100)}`
        ].join('\n');

        assert.strictEqual(new PaymentPackage('abc', 2).toString(), expected);

        // (this.active === false ? ' (inactive)' : '')
        res.active = false;
        expected = [`Package: ${res.name}` + (res.active === false ? ' (inactive)' : ''),
            `- Value (excl. VAT): ${res.value}`,
            `- Value (VAT ${res.VAT}%): ${res.value * (1 + res.VAT / 100)}`
        ].join('\n');
        assert.strictEqual(res.toString(), expected);
    });
});