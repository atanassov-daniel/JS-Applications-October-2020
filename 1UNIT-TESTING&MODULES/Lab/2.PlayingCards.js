function Card(face, suit) {
    let validFaces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    let validSuits = {
        "S": "♠",
        "H": "♥",
        "D": "♦",
        "C": "♣",
    };

    if (validFaces.includes(face) === false && validFaces.includes(Number(face)) === false) throw new TypeError("invalid face");
    if (Object.keys(validSuits).includes(suit) === false) throw new TypeError("invalid suit");

    return {
        face,
        suit,
        toString() {
            return `${face}${validSuits[suit]}`;
        }
    };
}

module.exports = Card;

// console.log(Card('A', 'S').toString()); // A♠
// console.log(Card('10', 'H').toString()); // 10♥
// console.log(Card('1', 'C').toString()); // Error