var indexPage = function (allCards) {

    var runIfConfirmed = function(functionToRun) {
        var confirmation = confirm("Are you sure you want to proceed to next 'phase'?");

        if (confirmation === true) {
            functionToRun();
        }
    };

    var viewModel = function (allCards) {
        var self = this; // TODO remove it?

        self.cardsInDeck = ko.observableArray(allCards.earlyWar);

        self.sureInHands = ko.observableArray([]);
        self.discardedPile = ko.observableArray([]);
        self.removedPile = ko.observableArray([]);

        self.progress = ko.observable("start");

        self.createUndo = function() {
            var sureClone = self.sureInHands.slice(0);
            var inDeckClone = self.cardsInDeck.slice(0);
            var discardedClone = self.discardedPile.slice(0);
            var removedClone = self.removedPile.slice(0);

            self.procedureToUndo ( function () {
                self.sureInHands(sureClone);
                self.cardsInDeck(inDeckClone);
                self.discardedPile(discardedClone);
                self.removedPile(removedClone);

                self.procedureToUndo(null);
            });
        };

        self.undo = function () {
            ko.unwrap(self.procedureToUndo)();
        };

        self.procedureToUndo = ko.observable(null);

        self.undoEnabled = ko.computed(function () {
            return ko.unwrap(self.procedureToUndo) !== null;
        });

        self.discard = function(card) {
            self.createUndo();
            
            self.sureInHands.remove(card);
            self.cardsInDeck.remove(card);
            self.discardedPile.push(card);
        };
        
        self.remove = function (card) {
            self.createUndo();

            self.sureInHands.remove(card);
            self.cardsInDeck.remove(card);
            self.removedPile.push(card);
        };

        self.reshuffleCards = function() {
            ko.utils.arrayForEach(self.cardsInDeck(), function (card) {
                self.sureInHands.push(card);
            });
            self.cardsInDeck.removeAll();

            ko.utils.arrayForEach(self.discardedPile(), function (card) {
                self.cardsInDeck.push(card);
            });
            self.discardedPile.removeAll();
        };

        self.enable3rdTurn = ko.observable(true);
        self.start3rdTurn = function () {
            runIfConfirmed(function() {
                self.reshuffleCards();

                self.enable3rdTurn(false);
                self.hasMidWarCards(true);

                self.procedureToUndo(null);
                self.progress("start3rdTurn");
            });
        };

        self.hasMidWarCards = ko.observable(false);
        self.addMidWarCards = function () {
            runIfConfirmed(function() {
                ko.utils.arrayForEach(allCards.midWar, function(card) {
                    self.cardsInDeck.push(card);
                });

                self.hasMidWarCards(false);
                self.has7thTurn(true);

                self.procedureToUndo(null);
                self.progress("addMidWarCards");
            });
        };
        
        self.has7thTurn = ko.observable(false);
        self.start7thTurn = function () {
            runIfConfirmed(function() {
                self.reshuffleCards();

                self.has7thTurn(false);
                self.hasLateWarCards(true);
            
                self.procedureToUndo(null);
                self.progress("start7thTurn");
            });
        };
        
        self.hasLateWarCards = ko.observable(false);
        self.addLateWarCards = function () {
            runIfConfirmed(function() {
                ko.utils.arrayForEach(allCards.lateWar, function (card) {
                    self.cardsInDeck.push(card);
                });

                self.hasLateWarCards(false);
            
                self.procedureToUndo(null);
                self.progress("addLateWarCards");
            });
        };

        ko.computed(function () {
            var cards = {
                cardsInDeckIds: _.pluck(self.cardsInDeck(), "id"),
                sureInHandsIds: _.pluck(self.sureInHands(), "id"),
                discardedPileIds: _.pluck(self.discardedPile(), "id"),
                midWarIds: _.pluck(allCards.midWar, "id"),
                lateWarIds: _.pluck(allCards.lateWar, "id"),
                progress: self.progress(),
            };

            localStorage.setItem('ts-cards#2', ko.toJSON(cards));
        }).extend({
            throttle: 500
        });
    };

    ko.applyBindings(new viewModel(allCards), document.getElementById("cards-container"));
};

$(function () {
    indexPage(cardsByStage);
});