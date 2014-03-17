underscoreJS = _;

KnockoutNewFunctions = ko;

var Card = (function () {
    function Card(id, name, picturePath, countryIds, regionIds) {
        this.id = id;
        this.name = name;
        this.picturePath = picturePath;
        this.countryIds = countryIds;
        this.regionIds = regionIds;
    }
    return Card;
})();

var Region = (function () {
    function Region(name, firstCountryId, lastCountryId) {
        this.name = name;
        this.firstCountryId = firstCountryId;
        this.lastCountryId = lastCountryId;
        this.countryIds = [];

        for (var i = firstCountryId; i < lastCountryId + 1; i++) {
            this.countryIds.push(i);
        }
    }
    return Region;
})();

var Country = (function () {
    function Country(id, name, x, y) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        var offsetX = 55;
        var offsetY = 38;

        this.coords = x + "," + y + "," + (x + offsetX) + "," + (y + offsetY);
    }
    return Country;
})();

var CardsCountries = (function () {
    function CardsCountries(cards, countries, regions) {
        var _this = this;
        this.cards = cards;
        this.countries = countries;
        this.regions = regions;
        this.connectedCards = ko.observableArray([]);
        this.hoveredCountry = ko.observable();
        this.isOnlyCurrentCardShown = true;
        ko.utils.arrayForEach(cards, function (card) {
            card.backgroundPositionY = (card.id - 1) * -113;
        });

        this.selectedCountry = ko.computed(this.hoveredCountry).extend({ throttle: 500 });

        this.cardsPosition = ko.computed(function () {
            if (_this.selectedCountry() !== undefined && _.contains(_this.regions[0].countryIds, _this.selectedCountry().id)) {
                return "down-cards";
            }

            return "";
        });

        this.selectedCountryName = ko.computed(function () {
            if (_this.selectedCountry() !== undefined) {
                return _this.selectedCountry().name;
            }

            return "Hover over a country";
        });

        this.clickMap = function () {
            _this.hoveredCountry(undefined);
        };

        this.showForCountry = function (country) {
            _this.hoveredCountry(country);
        };

        ko.computed(function () {
            var country = _this.selectedCountry();

            if (country === undefined) {
                _this.connectedCards.removeAll();
                return;
            }

            var allConnectedCards = _this.getConnectedCards(country);

            var cardsInGame = ko.utils.parseJson(localStorage.getItem('ts-cards#2'));
            if (cardsInGame === null) {
                alert("Visit 'Cards' and start choosing cards");
                cardsInGame = { sureInHandsIds: [], cardsInDeckIds: [], discardedPileIds: [], progress: "start", midWarIds: [], lateWarIds: [] };
            }

            var filterByIdsAndAddUrgency = function (allConnectedCards, ids, urgency) {
                return ko.utils.arrayFilter(allConnectedCards, function (card) {
                    if (_.contains(ids, card.id)) {
                        card.urgency = urgency;
                        return true;
                    }
                });
            };

            var connectedInHands = filterByIdsAndAddUrgency(allConnectedCards, cardsInGame.sureInHandsIds, "sureInHands");
            var connectedInDeck = filterByIdsAndAddUrgency(allConnectedCards, cardsInGame.cardsInDeckIds, "cardsInDeck");

            var connectedWillComeSoon = [];
            if (_this.isOnlyCurrentCardShown === false) {
                connectedWillComeSoon = filterByIdsAndAddUrgency(allConnectedCards, _this.getWillComeSoonIds(cardsInGame), "willComeSoon");
            }

            _this.connectedCards(connectedInHands.concat(connectedInDeck, connectedWillComeSoon));
        });

        this.getWillComeSoonIds = function (cardsInGame) {
            switch (cardsInGame.progress) {
                case "start":
                    return cardsInGame.discardedPileIds.concat(cardsInGame.midWarIds);
                    break;
                case "start3rdTurn":
                    return cardsInGame.midWarIds;
                    break;
                case "addMidWarCards":
                    return cardsInGame.discardedPileIds.concat(cardsInGame.lateWarIds);
                    break;
                case "start7thTurn":
                    return cardsInGame.lateWarIds;
                    break;
                case "addLateWarCards":
                    return [];
                    break;
                default:
                    throw "cardsInGame.progress is out of range";
                    break;
            }
        };

        this.getConnectedCards = function (country) {
            var cardsConnectedById = _.filter(_this.cards, function (card) {
                return _.contains(card.countryIds, country.id);
            });

            var cardsConnectedByRegion = _.filter(_this.cards, function (card) {
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
        };
    }
    return CardsCountries;
})();
