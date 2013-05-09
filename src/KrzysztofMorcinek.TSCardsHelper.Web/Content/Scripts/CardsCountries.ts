/// <reference path="../../Scripts/typings/underscore/underscore-typed-1.4.3.d.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

// Workaround for not having all _ methods in definitions.
declare var underscoreJS: any;
underscoreJS = _;
declare var KnockoutNewFunctions: any;
KnockoutNewFunctions = ko;

class Card {
    constructor(public id: number, public name: string, public picturePath: string, public countryIds: number[], public regionIds: number[]) { }
}

class Region {
    public countryIds: number[];
    constructor(public name: string, private firstCountryId: number, private lastCountryId: number) {
        this.countryIds = [];

        for (var i = firstCountryId; i < lastCountryId + 1; i++) {
            this.countryIds.push(i);
        }
    }
}

class Country {
    public coords: string;
    constructor(public id: number, public name: string, private x: number, private y: number) {
        var offsetX = 55;
        var offsetY = 38;

        this.coords = x + "," + y + "," + (x + offsetX) + "," + (y + offsetY);
    }
}

class CardsCountries {
    connectedCards = ko.observableArray([]);
    examinedCountry = ko.observable("Hover over a country");
    public showForCountry: (countryArea) => void;
    private getConnectedCards: (country) => Card[];

    constructor(public cards: Card[], public countries: Country[], private regions: Region[]) {

        this.showForCountry = (country) => {
            
            this.examinedCountry(country.name);

            var returningCards = this.getConnectedCards(country);

            var cards = ko.utils.parseJson(localStorage.getItem('ts-cards'));
            var removedPile = cards.removedPile;

            returningCards = _.filter(returningCards, function (item) {
                return _.filter(removedPile, function (removedItem) {
                    return removedItem.id === item.id;
                }).length === 0;
            });

            // add color
            ko.utils.arrayForEach(returningCards, function (card) {
                if (underscoreJS.findWhere(cards.sureInHands, { name: card.name }) !== undefined) {
                    card.urgency = "sureInHands";
                } else if (underscoreJS.findWhere(cards.cardsInDeck, { name: card.name }) !== undefined) {
                    card.urgency = "cardsInDeck";
                } else {
                    card.urgency = "empty";
                }
            });

            this.connectedCards.valueWillMutate();
            this.connectedCards.removeAll();
            KnockoutNewFunctions.utils.arrayPushAll(this.connectedCards, returningCards);
            this.connectedCards.valueHasMutated();
        }

        this.getConnectedCards = (country) => {
            var cardsConnectedById = _.filter(this.cards, function (card) {
                return _.contains(card.countryIds, country.id);
            });

            var cardsConnectedByRegion = _.filter(this.cards, function (card) {
                var resultFromRegion = false;

                if (card.regionIds !== undefined) {
                    for (var i = 0; i < card.regionIds.length; i++) {
                        var idsFromRegion = this.regions[card.regionIds[i]].countryIds;
                        resultFromRegion = resultFromRegion || _.contains(idsFromRegion, country.id);
                    }
                }

                return resultFromRegion;
            });

            return _.uniq(cardsConnectedById.concat(cardsConnectedByRegion));
        }
    }
}