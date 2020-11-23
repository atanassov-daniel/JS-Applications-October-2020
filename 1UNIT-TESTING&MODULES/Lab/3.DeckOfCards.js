const Card = require("./2.PlayingCards");

function printDeckOfCards(cards) {
    let result = [];
    let invalidCardFound = false;

    cards.forEach(card => {
        let match = card.match(/([23456789JQKA]|10)([SHDC])/);
        if (match === null) {
            invalidCardFound = "Invalid card: " + card;
            return; // so that "face" doesn't try to get index[1] of null
        }

        let face = match[1];
        let suit = match[2];
        result.push(new Card(face, suit).toString());
    });

    invalidCardFound !== false ? console.log(invalidCardFound) : console.log(result.join(" "));
}

printDeckOfCards(['AS', '10D', 'KH', '2C']); // A♠ 10♦ K♥ 2♣
printDeckOfCards(['5S', '3D', 'QD', '1C']); // Invalid card: 1C