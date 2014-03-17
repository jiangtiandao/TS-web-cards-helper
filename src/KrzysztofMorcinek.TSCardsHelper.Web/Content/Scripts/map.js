// flat cards
var cards = cardsByStage.earlyWar.concat(cardsByStage.midWar, cardsByStage.lateWar);

var cardsInGame = ko.utils.parseJson(localStorage.getItem('ts-cards#2'));
if (cardsInGame === null) {
    cardsInGame = { sureInHandsIds: [], cardsInDeckIds: _.pluck(cardsByStage.earlyWar, "id"), discardedPileIds: [], progress: "start", midWarIds: [], lateWarIds: [] };
    localStorage.setItem('ts-cards#2', ko.toJSON(cardsInGame));
}

var cardsForCountries = [
{ "id": 1, "countryIds": [], "regionIds": [4] }, // Asia Scoring
{ "id": 2, "countryIds": [], "regionIds": [0] }, // Europe Scoring
{ "id": 3, "countryIds": [], "regionIds": [3] }, // Middle East Scoring
{ "id": 4, "countryIds": [], "regionIds": [] }, // Duck and Cover
{ "id": 5, "countryIds": [], "regionIds": [] }, // Five Year Plan
{ "id": 6, "countryIds": [31, 32, 36], "regionIds": [4] }, // The China Card
{ "id": 7, "countryIds": [], "regionIds": [1] }, // Socialist Governments
{ "id": 8, "countryIds": [71], "regionIds": [] }, // Fidel*
{ "id": 9, "countryIds": [37], "regionIds": [5] }, // Vietnam Revolts*
{ "id": 10, "countryIds": [7], "regionIds": [] }, // Blockade*
{ "id": 11, "countryIds": [42, 43, 44, 45], "regionIds": [] }, // Korean War*
{ "id": 12, "countryIds": [20], "regionIds": [] }, // Romanian Abdication*
{ "id": 13, "countryIds": [21, 22, 23, 27, 28], "regionIds": [] }, // Arab-Israeli War
{ "id": 14, "countryIds": [], "regionIds": [2] }, // Comecon*
{ "id": 15, "countryIds": [27], "regionIds": [] }, // Nasser*
{ "id": 16, "countryIds": [], "regionIds": [2] }, // Warsaw Pact Formed*
{ "id": 17, "countryIds": [3], "regionIds": [] }, // De Gaulle Leads France*
{ "id": 18, "countryIds": [], "regionIds": [] }, // Captured Nazi Scientist*
{ "id": 19, "countryIds": [], "regionIds": [0] }, // Truman Doctrine*
{ "id": 20, "countryIds": [], "regionIds": [] }, // Olympic Games
{ "id": 21, "countryIds": [], "regionIds": [0] }, // NATO*
{ "id": 22, "countryIds": [15, 20, 19, 18, 16], "regionIds": [] }, // Independent Reds*
{ "id": 23, "countryIds": [], "regionIds": [1] }, // Marshall Plan*
{ "id": 24, "countryIds": [25, 31, 32, 33, 34], "regionIds": [] }, // Indo-Pakistani War
{ "id": 25, "countryIds": [], "regionIds": [] }, // Containment*
{ "id": 26, "countryIds": [], "regionIds": [] }, // CIA Created*
{ "id": 27, "countryIds": [42], "regionIds": [] }, // US/Japan Mutual Defense Pact*
{ "id": 28, "countryIds": [1, 3, 23], "regionIds": [] }, // Suez Crisis*
{ "id": 29, "countryIds": [], "regionIds": [2] }, // East European Unrest
{ "id": 30, "countryIds": [], "regionIds": [5, 6] }, // Decolonization
{ "id": 31, "countryIds": [], "regionIds": [] }, // Red Scare/Purge
{ "id": 32, "countryIds": [], "regionIds": [] }, // UN Intervention
{ "id": 33, "countryIds": [], "regionIds": [0, 3, 4, 6, 7, 8] }, // De-Stalinization*
{ "id": 34, "countryIds": [], "regionIds": [] }, // Nuclear Test Ban
{ "id": 35, "countryIds": [43], "regionIds": [] }, // Formosan Resolution*
{ "id": 36, "countryIds": [], "regionIds": [] },// Brush War 
{ "id": 37, "countryIds": [], "regionIds": [7] },// Central America Scoring 
{ "id": 38, "countryIds": [], "regionIds": [5] },// Southeast Asia Scoring* 
{ "id": 39, "countryIds": [], "regionIds": [] },// Arms Race 
{ "id": 40, "countryIds": [7, 12, 71], "regionIds": [] },// Cuban Missile Crisis* 
{ "id": 41, "countryIds": [], "regionIds": [] },// Nuclear Subs* 
{ "id": 42, "countryIds": [0], "regionIds": [] },// Quagmire* 
{ "id": 43, "countryIds": [], "regionIds": [] },// SALT Negotiations* 
{ "id": 44, "countryIds": [], "regionIds": [] },// Bear Trap* 
{ "id": 45, "countryIds": [], "regionIds": [] },// Summit 
{ "id": 46, "countryIds": [], "regionIds": [] },// How I Learned to Stop Worrying* 
{ "id": 47, "countryIds": [], "regionIds": [7, 8] },// Junta 
{ "id": 48, "countryIds": [], "regionIds": [] },// Kitchen Debates* 
{ "id": 49, "countryIds": [], "regionIds": [] },// Missile Envy 
{ "id": 50, "countryIds": [], "regionIds": [] },// “We Will Bury You”* 
{ "id": 51, "countryIds": [], "regionIds": [] },// Brezhnev Doctrine* 
{ "id": 52, "countryIds": [55, 59], "regionIds": [] },// Portuguese Empire Crumbles* 
{ "id": 53, "countryIds": [55, 56, 57], "regionIds": [] },// South African Unrest 
{ "id": 54, "countryIds": [80], "regionIds": [] },// Allende* 
{ "id": 55, "countryIds": [7], "regionIds": [] },// Willy Brandt* 
{ "id": 56, "countryIds": [22, 24, 25, 26, 27, 28, 30, 63], "regionIds": [] },// Muslim Revolution 
{ "id": 57, "countryIds": [], "regionIds": [] },// ABM Treaty 
{ "id": 58, "countryIds": [], "regionIds": [4] },// Cultural Revolution* 
{ "id": 59, "countryIds": [], "regionIds": [] },// Flower Power* 
{ "id": 60, "countryIds": [], "regionIds": [] },// U2 Incident* 
{ "id": 61, "countryIds": [24, 25, 26, 27, 29, 30, 75], "regionIds": [] },// OPEC 
{ "id": 62, "countryIds": [], "regionIds": [] },// “Lone Gunman”* 
{ "id": 63, "countryIds": [], "regionIds": [5, 6] },// Colonial Rear Guards 
{ "id": 64, "countryIds": [68, 69, 75], "regionIds": [] },// Panama Canal Returned* 
{ "id": 65, "countryIds": [23, 27, 28], "regionIds": [] },// Camp David Accords* 
{ "id": 66, "countryIds": [], "regionIds": [0, 3, 4, 6, 7, 8] },// Puppet Governments* 
{ "id": 67, "countryIds": [], "regionIds": [] },// Grain Sales to Soviets 
{ "id": 68, "countryIds": [17], "regionIds": [] },// John Paul II Elected Pope* 
{ "id": 69, "countryIds": [], "regionIds": [7, 8] },// Latin American Death Squads 
{ "id": 70, "countryIds": [], "regionIds": [7, 8] },// OAS Founded* 
{ "id": 71, "countryIds": [], "regionIds": [4] },// Nixon Plays the China Card* 
{ "id": 72, "countryIds": [27], "regionIds": [] },// Sadat Expels Soviets* 
{ "id": 73, "countryIds": [], "regionIds": [3, 4] },// Shuttle Diplomacy 
{ "id": 74, "countryIds": [], "regionIds": [3, 4, 6, 7, 8] },// The Voice of America 
{ "id": 75, "countryIds": [], "regionIds": [7] },// Liberation Theology 
{ "id": 76, "countryIds": [], "regionIds": [4] },// Ussuri River Skirmish* 
{ "id": 77, "countryIds": [], "regionIds": [] },// “Ask Not What Your Country…”* 
{ "id": 78, "countryIds": [], "regionIds": [7, 8] },// Alliance for Progress* 
{ "id": 79, "countryIds": [], "regionIds": [6] },// Africa Scoring 
{ "id": 80, "countryIds": [], "regionIds": [] },// “One Small Step…” 
{ "id": 81, "countryIds": [], "regionIds": [8] },// South America Scoring 
{ "id": 82, "countryIds": [25], "regionIds": [] },// Iranian Hostage Crisis*
{ "id": 83, "countryIds": [1, 79], "regionIds": [] },// The Iron Lady*
{ "id": 84, "countryIds": [26], "regionIds": [] },// Reagan Bombs Libya*
{ "id": 85, "countryIds": [], "regionIds": [] },// Star Wars*
{ "id": 86, "countryIds": [], "regionIds": [] },// North Sea Oil*
{ "id": 87, "countryIds": [], "regionIds": [0] },// The Reformer*
{ "id": 88, "countryIds": [21], "regionIds": [3] },// Marine Barracks Bombing*
{ "id": 89, "countryIds": [44], "regionIds": [] },// Soviets Shoot Down KAL-007*
{ "id": 90, "countryIds": [], "regionIds": [0] },// Glasnost*
{ "id": 91, "countryIds": [67, 68, 70, 71, 72], "regionIds": [] },// Ortega Elected in Nicaragua*
{ "id": 92, "countryIds": [], "regionIds": [] },// Terrorism
{ "id": 93, "countryIds": [], "regionIds": [] },// Iran-Contra Scandal*
{ "id": 94, "countryIds": [], "regionIds": [0, 3, 4, 6, 7, 8] },// Chernobyl*
{ "id": 95, "countryIds": [], "regionIds": [8] },// Latin American Debt Crisis
{ "id": 96, "countryIds": [9], "regionIds": [0] },// Tear Down this Wall*
{ "id": 97, "countryIds": [], "regionIds": [] },// “An Evil Empire”*
{ "id": 98, "countryIds": [], "regionIds": [] },// Aldrich Ames Remix*
{ "id": 99, "countryIds": [], "regionIds": [1] },// Pershing II Deployed*
{ "id": 100, "countryIds": [], "regionIds": [] },// Wargames*
{ "id": 101, "countryIds": [17], "regionIds": [] },// Solidarity*
{ "id": 102, "countryIds": [24, 25, 28, 29, 30, 31, 32], "regionIds": [] },// Iran-Iraq War*
{ "id": 103, "countryIds": [], "regionIds": [] }, // Defectors
{ "id": 104, "countryIds": [], "regionIds": [] }, // The Cambridge Five
{ "id": 105, "countryIds": [1], "regionIds": [1] }, // Special Relationship
{ "id": 106, "countryIds": [0], "regionIds": [] }, // NORAD*
{ "id": 107, "countryIds": [], "regionIds": [6, 7, 8] },// Che 
{ "id": 108, "countryIds": [], "regionIds": [3] },// Our Man in Tehran*
{ "id": 109, "countryIds": [], "regionIds": [] },// Yuri and Samantha*
{ "id": 110, "countryIds": [30], "regionIds": [3] },// AWACS Sale to Saudis*
];

// Apply cards with countries they reference
for (var i = 0; i < cardsForCountries.length; i++) {
    var forContries = cardsForCountries[i];
    var card = _.findWhere(cards, { id: forContries.id });
    card.countryIds = forContries.countryIds;
    card.regionIds = forContries.regionIds;
}

var regions = [
    new Region("Europe", 0, 20),
    new Region("West Europe", 0, 14),
    new Region("East Europe", 13, 20),
    new Region("Middle East", 21, 30),
    new Region("Asia", 31, 45),
    new Region("SE Asia", 34, 40),
    new Region("Africa", 46, 63),
    new Region("Central America", 64, 73),
    new Region("South America", 74, 83),
];

var countries = [
    new Country(0, "Canada", 230, 195),
    new Country(1, "UK", 460, 147),
    new Country(2, "Spain/Portugal", 450, 295),
    new Country(3, "France", 494, 239),
    new Country(4, "Benelux", 506, 190),
    new Country(5, "Norway", 525, 68),
    new Country(6, "Denmark", 538, 110),
    new Country(7, "W.Germany", 566, 190),
    new Country(8, "Italy", 576, 273),
    new Country(9, "E.Germany", 586, 150),
    new Country(10, "Sweden", 607, 102),
    new Country(11, "Greece", 652, 318),
    new Country(12, "Turkey", 758, 279),
    new Country(13, "Austria", 591, 231),
    new Country(14, "Finland", 686, 70),
    new Country(15, "Yugoslavia", 637, 273),
    new Country(16, "Chechoslovakia", 638, 190),
    new Country(17, "Poland", 649, 149),
    new Country(18, "Hungary", 651, 230),
    new Country(19, "Bulgaria", 699, 273),
    new Country(20, "Romania", 711, 230),
    new Country(21, "Lebanon", 723, 320),
    new Country(22, "Syria", 782, 320),
    new Country(23, "Israel", 713, 360),
    new Country(24, "Iraq", 782, 360),
    new Country(25, "Iran", 841, 360),
    new Country(26, "Libya", 624, 396),
    new Country(27, "Eqypt", 685, 402),
    new Country(28, "Jordan", 752, 401),
    new Country(29, "Gulf States", 819, 400),
    new Country(30, "Saudi Arabia", 803, 441),
    new Country(31, "Afganistan", 911, 333),
    new Country(32, "Pakistan", 911, 385),
    new Country(33, "India", 977, 414),
    new Country(34, "Burma", 1050, 421),
    new Country(35, "Laos/Cambodia", 1108, 427),
    new Country(36, "Thailand", 1083, 470),
    new Country(37, "Vietnam", 1144, 470),
    new Country(38, "Malaysia", 1111, 534),
    new Country(39, "Indonesia", 1210, 582),
    new Country(40, "Philippines", 1232, 469),
    new Country(41, "Australia", 1211, 655),
    new Country(42, "Japan", 1280, 357),
    new Country(43, "Taiwan", 1206, 406),
    new Country(44, "S. Korea", 1232, 319),
    new Country(45, "N. Korea", 1220, 278),
    new Country(46, "Tunisia", 589, 348),
    new Country(47, "Algeria", 527, 354),
    new Country(48, "Morocco", 467, 372),
    new Country(49, "West African States", 461, 425),
    new Country(50, "Ivory Coast", 500, 504),
    new Country(51, "Saharan States", 552, 439),
    new Country(52, "Nigeria", 575, 497),
    new Country(53, "Cameroon", 602, 544),
    new Country(54, "Zaire", 673, 564),
    new Country(55, "Angola", 620, 614),
    new Country(56, "South Africa", 645, 721),
    new Country(57, "Botswana", 674, 678),
    new Country(58, "Zimbabwe", 694, 635),
    new Country(59, "SE African States", 753, 603),
    new Country(60, "Kenya", 745, 548),
    new Country(61, "Somalia", 804, 510),
    new Country(62, "Ethiopia", 737, 493),
    new Country(63, "Sudan", 695, 450),
    new Country(64, "Mexico", 49, 364),
    new Country(65, "Guatemala", 100, 406),
    new Country(66, "El Salvador", 81, 450),
    new Country(67, "Honduras", 141, 447),
    new Country(68, "Costa Rica", 136, 489),
    new Country(69, "Panama", 203, 488),
    new Country(70, "Nicaragua", 201, 447),
    new Country(71, "Cuba", 205, 394),
    new Country(72, "Haiti", 264, 432),
    new Country(73, "Dominican Rep", 323, 431),
    new Country(74, "Colombia", 242, 538),
    new Country(75, "Venezuela", 274, 494),
    new Country(76, "Brazil", 378, 598),
    new Country(77, "Uruguay", 328, 735),
    new Country(78, "Paraquay", 309, 685),
    new Country(79, "Argentina", 262, 768),
    new Country(80, "Chile", 241, 689),
    new Country(81, "Peru", 212, 602),
    new Country(82, "Bolivia", 274, 640),
    new Country(83, "Ecuador", 177, 556),
];

var cc = new CardsCountries(cards, countries, regions);

ko.applyBindings(cc, document.getElementById("map-container"));