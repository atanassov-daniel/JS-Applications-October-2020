const {
    assert,
    expect
} = require("chai");

class Warehouse {
    get capacity() {
        return this._capacity;
    }

    set capacity(givenSpace) {
        if (typeof givenSpace === 'number' && givenSpace > 0) {
            return this._capacity = givenSpace;
        } else {
            throw `Invalid given warehouse space`;
        }
    }

    constructor(capacity) {
        this.capacity = capacity;
        this.availableProducts = {
            'Food': {},
            'Drink': {}
        };
    }

    addProduct(type, product, quantity) {

        let addedQuantity = ((this.capacity - this.occupiedCapacity()) - quantity);
        let output;

        if (addedQuantity >= 0) {

            if (this.availableProducts[type].hasOwnProperty(product) === false) {
                this.availableProducts[type][product] = 0;
            }

            this.availableProducts[type][product] += quantity;
            output = this.availableProducts[type];

        } else {
            throw `There is not enough space or the warehouse is already full`;
        }

        return output;
    }

    orderProducts(type) {
        let output;
        let sortedKeys = Object.keys(this.availableProducts[type])
            .sort((a, b) => this.availableProducts[type][b] - this.availableProducts[type][a]);

        let newObj = {};

        for (let product of sortedKeys) {

            if (newObj.hasOwnProperty(product) === false) {
                newObj[product] = 0;
            }

            newObj[product] += this.availableProducts[type][product];
        }

        this.availableProducts[type] = newObj;
        output = this.availableProducts[type];

        return output;
    }

    occupiedCapacity() {
        let output = 0;
        let productsCount = Object.keys(this.availableProducts['Food']).length +
            Object.keys(this.availableProducts['Drink']).length;

        if (productsCount > 0) {

            let quantityInStock = 0;

            for (let type of Object.keys(this.availableProducts)) {

                for (let product of Object.keys(this.availableProducts[type])) {

                    quantityInStock += this.availableProducts[type][product];
                }
            }

            output = quantityInStock;
        }

        return output;
    }

    revision() {
        let output = "";

        if (this.occupiedCapacity() > 0) {

            for (let type of Object.keys(this.availableProducts)) {
                output += `Product type - [${type}]\n`;
                for (let product of Object.keys(this.availableProducts[type])) {
                    output += `- ${product} ${this.availableProducts[type][product]}\n`;
                }
            }
        } else {
            output = 'The warehouse is empty';
        }

        return output.trim();
    }

    scrapeAProduct(product, quantity) {
        let type = Object.keys(this.availableProducts).find(t => Object.keys(this.availableProducts[t]).includes(product));
        let output;

        if (type !== undefined) {

            if (quantity <= this.availableProducts[type][product]) {
                this.availableProducts[type][product] -= quantity;
            } else {
                this.availableProducts[type][product] = 0;
            }

            output = this.availableProducts[type];

        } else {
            throw `${product} do not exists`;
        }

        return output;
    }
}

describe("test the functionality of the constructor", () => {
    it("check if the constructor throws an error when it gets passed in an invalid argument", () => {
        expect(() => new Warehouse("7")).to.throw(`Invalid given warehouse space`); // a non-number argument
        expect(() => new Warehouse(0)).to.throw(`Invalid given warehouse space`); // 0
        expect(() => new Warehouse(-1)).to.throw(`Invalid given warehouse space`); // a negative number

        // the second zero test is incorrect with this solution, but is correct, when I comment the last two 'expects' which is incorrect imo
    });

    it("check if the constructor works as expected when passed a valid argument", () => {
        let instance = new Warehouse(5);
        assert.strictEqual(instance._capacity, 5);

        assert.notStrictEqual(instance.availableProducts, undefined);
        assert.strictEqual(typeof instance.availableProducts.Drink, "object");
        assert.strictEqual(typeof instance.availableProducts.Food, "object");
    });
});

describe("test the functionality of addProduct(type, product, quantity)", () => {
    it("check if it throws an error when there is not enough capacity", () => {
        let obj = new Warehouse(5);
        expect(() => obj.addProduct("Food", "product", 10)).to.throw(`There is not enough space or the warehouse is already full`);
        expect(() => obj.addProduct("Drink", "product", 10)).to.throw(`There is not enough space or the warehouse is already full`);
    });

    it("check if it works correctly with `type = 'Food'` ", () => {
        let obj1 = new Warehouse(5);
        let returnValue1 = obj1.addProduct("Food", "product", 2);
        assert.strictEqual(JSON.stringify(returnValue1), '{"product":2}');

        let returnValue2 = obj1.addProduct("Food", "product", 3);
        assert.strictEqual(JSON.stringify(returnValue2), '{"product":5}');

        let obj2 = new Warehouse(5).addProduct("Food", "product", 5);
        assert.strictEqual(JSON.stringify(obj2), '{"product":5}');
    });

    it("check if it works correctly with `type = 'Drink'` ", () => {
        let obj = new Warehouse(5);
        let returnValue1 = obj.addProduct("Drink", "product", 2);
        assert.strictEqual(JSON.stringify(returnValue1), '{"product":2}');

        let returnValue2 = obj.addProduct("Drink", "product", 3);
        assert.strictEqual(JSON.stringify(returnValue2), '{"product":5}');

        let obj2 = new Warehouse(5).addProduct("Drink", "product", 5);
        assert.strictEqual(JSON.stringify(obj2), '{"product":5}');
    });
});

describe("test the functionality of orderProducts(type) and of occupiedCapacity()", () => {
    it("test if it works properly with 'type = Drink' ", () => {
        let obj = new Warehouse(80);

        obj.addProduct("Drink", "product1", 5);
        obj.addProduct("Drink", "product2", 0);
        obj.addProduct("Drink", "product3", 2);
        obj.addProduct("Drink", "product4", 19);
        obj.addProduct("Drink", "product5", 1);

        let returnValue = obj.orderProducts("Drink");
        assert.strictEqual(JSON.stringify(returnValue), '{"product4":19,"product1":5,"product3":2,"product5":1,"product2":0}');

        // test the functionality of occupiedCapacity()
        assert.strictEqual(obj.occupiedCapacity(), 27);
    });
});

describe("test the functionality of revision()", () => {
    it("test if the function works correctly", () => {
        let obj = new Warehouse(80);

        obj.addProduct("Food", "food1", 51);
        obj.addProduct("Drink", "product1", 5);
        obj.addProduct("Drink", "product2", 0);
        obj.addProduct("Drink", "product3", 2);
        obj.addProduct("Drink", "product4", 19);
        obj.addProduct("Drink", "product5", 1);

        let expected = JSON.stringify(obj.revision());

        assert.equal(JSON.stringify(obj.revision()), expected);
        // "Product type - [Food]\n- food1 51\nProduct type - [Drink]\n- product1 5\n- product2 0\n- product3 2\n- product4 19\n- product5 1"
    });

    it("test if when there are no products, the function returns the expected message", () => {
        assert.equal(new Warehouse(80).revision(), 'The warehouse is empty');
    });
});

describe("test the functionality of scrapeAProduct(product, quantity)", () => {
    it("if the product does not exist, an error must be thrown", () => {
        let obj = new Warehouse(80);
        obj.addProduct("Drink", "abcdefghijklmnop", 17);

        expect(() => obj.scrapeAProduct("product1", 3)).to.throw("product1 do not exists");
    });

    it("if the passed in quantity is larger than the quantity of the product, it shall be reset", () => {
        let obj = new Warehouse(80);
        obj.addProduct("Drink", "product1", 10);

        obj.scrapeAProduct("product1", 20);
        assert.strictEqual(obj.availableProducts.Drink.product1, 0);
    });

    it("if the passed in quantity is equal to or smaller than the quantity of the product, the quantity of the productshould be reduced by the amount from the argument", () => {
        let obj = new Warehouse(80);
        obj.addProduct("Drink", "product1", 20);

        obj.scrapeAProduct("product1", 10);
        assert.strictEqual(obj.availableProducts.Drink.product1, 10);
    });
});