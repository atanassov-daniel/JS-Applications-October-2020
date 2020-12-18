// <script>
// window.func = function () {
for (let i = 1; i <= 101; i++) {
    let description, url, make, model, year, price, material;

    if (i % 3 === 0) { // 3
        description = "Cool Chair with table";
        url = `https://i.ytimg.com/vi/ruvOXeyJ71o/maxresdefault.jpg`;
        make = "Chair";
        model = "Chinese";
        year = 2050;
        price = 4000.8257315928;
        material = "Innovative New Generation Transparent High-tech Material";
    } else if (i % 2 === 0) { // 2
        description = "Big Red Sofa";
        url = `https://i.pinimg.com/originals/46/6b/97/466b9711663cc2dc290ba76f4ae726e0.jpg`;
        make = "Sofa";
        model = "Finnish";
        year = 2010;
        price = 1573.00;
        material = "Wool and Synthetics";
    } else if (i % 2 === 1) { // 1
        description = "Small Wooden Table";
        url = `https://static.zarahome.net/8/photos4/2021/V/4/1/p/9273/072/700/9273072700_1_1_3.jpg?t=1607616016849`;
        make = "Table";
        model = "Swedish";
        year = 1976;
        price = 387;
        material = "Wood";
    }


    fetch(`https://js-apps-dbs-default-rtdb.firebaseio.com/furniture/.json`, {
        method: "POST",
        body: JSON.stringify({
            make,
            model,
            year,
            description,
            price,
            url,
            material
        })
    });
}
// }
// </script>




// "make": `someMake${i}`,
// "model": `someModel${i}`,
// "year": `someYear${i}`,
// "description": `someDescription${i}`,
// "price": `somePrice${i}`,
// "imageURL": `someImageURL${i}`,
// "material": `someMaterial${i}`


// "make": make,
// "model": model,
// "year": year,
// "description": description,
// "price": price,
// "imageURL": url,
// "material": material