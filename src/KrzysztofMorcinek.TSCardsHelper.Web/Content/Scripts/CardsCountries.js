underscoreJS = _;
KnockoutNewFunctions = ko;
var Card = (function () {
    function Card(id, name) {
        this.id = id;
        this.name = name;
    }
    return Card;
})();
var Country = (function () {
    function Country(id, name, cardIds) {
        this.id = id;
        this.name = name;
        this.cardIds = cardIds;
    }
    return Country;
})();
var CardsCountries = (function () {
    function CardsCountries(cards, countries) {
        this.cards = cards;
        this.countries = countries;
        var _this = this;
        this.connectedCards = ko.observableArray([]);
        this.mapAreas = ko.observableArray([]);
        this.mapAreas.push({
            id: 1
        });
        this.showForCountry = function (countryArea) {
            _this.getCards(countryArea.id);
        };
    }
    CardsCountries.prototype.getCards = function (countryId) {
        var country = underscoreJS.findWhere(this.countries, {
            id: countryId
        });
        var returningCards = _.filter(this.cards, function (card) {
            return _.contains(country.cardIds, card.id);
        });
        this.connectedCards.valueWillMutate();
        this.connectedCards.removeAll();
        KnockoutNewFunctions.utils.arrayPushAll(this.connectedCards, returningCards);
        this.connectedCards.valueHasMutated();
        return returningCards;
    };
    return CardsCountries;
})();
