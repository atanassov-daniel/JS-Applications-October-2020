import {
    request
} from "./request.js";

const baseUrl = `https://shoeshelf-2b04b-default-rtdb.firebaseio.com`;

export const shoeService = {
    async getAll() {
        let data = await request(`${baseUrl}/shoes/.json`, 'GET');

        return Object
            .keys(data)
            .map(key => ({
                ...data[key],
                key,
                price: data[key].price.toFixed(2)
            }))
            .sort((obj1, obj2) => {
                let bool = ((Object.values(obj2.buyers || {}).length || 0) - (Object.values(obj1.buyers || {}).length || 0));

                return bool;
            }); // sort the entries in descending order by the count of the buyers
    },

    async getOne(key) {
        let data = await request(`${baseUrl}/shoes/${key}/.json`, 'GET');

        return {
            ...data,
            key,
            price: data.price.toFixed(2)
        };
    },

    async create(shoeInfo) {
        let data = await request(`${baseUrl}/shoes/.json`, 'POST', shoeInfo);

        /* await request(`https://shoeshelf-2b04b-default-rtdb.firebaseio.com/shoes/.json`, 'POST', JSON.stringify({
            name: 'Nike Pegasus',
            price: '72,90',
            imageUrl: 'https://i1.t4s.cz/products/ar4149-001/nike-air-zoom-pegasus-36-gs-251390-ar4149-001.jpeg'
        })); */
        return data.name; // this is the key of the newly created item
    },

    async edit(key, shoeInfo) {
        let data = await request(`${baseUrl}/shoes/${key}.json`, 'PATCH', shoeInfo);

        return data.name; // this is the key of the edited item
    },

    async buyShoe(key, email) {
        let buyers = await request(`${baseUrl}/shoes/${key}/buyers.json`, 'GET') || {};
        buyers = Object.values(buyers) || [];

        if (buyers.includes(email) === false) {
            let data = await request(`${baseUrl}/shoes/${key}/buyers.json`, 'POST', email);

            return data;
        }
        return {
            hasBought: true
        };
    },

    async delete(key) {
        let data = await request(`${baseUrl}/shoes/${key}.json`, 'DELETE');

        return data;
    },
};
/* 
await request(`https://shoeshelf-2b04b-default-rtdb.firebaseio.com/shoes/.json`, 'POST', JSON.stringify({
    name: 'Nike Pegasus',
    price: '72,90',
    imageUrl: 'https://i1.t4s.cz/products/ar4149-001/nike-air-zoom-pegasus-36-gs-251390-ar4149-001.jpeg'
})); */