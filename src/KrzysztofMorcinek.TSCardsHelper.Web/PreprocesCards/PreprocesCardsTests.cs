using System.Dynamic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NUnit.Framework;

namespace KrzysztofMorcinek.TSCardsHelper.Web.PreprocesCards
{
    [TestFixture]
    public class PreprocesCardsTests
    {
        private const string EarlyWarXml = @"KrzysztofMorcinek.TSCardsHelper.Web\DataFiles\EarlyWar.xml";
        private const string MidWarXml = @"KrzysztofMorcinek.TSCardsHelper.Web\DataFiles\MidWarToParse.xml";
        private const string LateWarXml = @"KrzysztofMorcinek.TSCardsHelper.Web\DataFiles\LateWarToParsexml.xml";

        // TODO annoying right path
        private string basePath = @"D:\NieWirtualki\Work\GitHub\TS-web-cards-helper\src";

        private string GetCards()
        {
            dynamic cards = new ExpandoObject();

            cards.EarlyWar = CardParser.ParseCardsPage(Path.Combine(basePath, EarlyWarXml))
                .ToArray();

            cards.MidWar = CardParser.ParseCardsPage(Path.Combine(basePath, MidWarXml))
                .ToArray();

            cards.LateWar = CardParser.ParseCardsPage(Path.Combine(basePath, LateWarXml))
                .ToArray();

            var jsonSerializerSettings = new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver() };
            return JsonConvert.SerializeObject(cards, Formatting.Indented, jsonSerializerSettings);
        }

        [Test]
        public void GenerateCardsData()
        {
            var path = @"../Content/Scripts/cardsData.js";
            File.WriteAllText(path, "var cardsByStage =" + GetCards());
        }
    }
}