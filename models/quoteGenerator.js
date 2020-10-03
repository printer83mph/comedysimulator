const { PredicateSyntax } = require("english-io");
const movieQuote = require("popular-movie-quotes");

class QuoteGenerator {

  static makeQuote(input, callback) {

    const originalQuote = movieQuote.getRandomQuote();

    console.log(`quote is ${originalQuote}`);

    const pred = new PredicateSyntax();
    let sentence = pred.parse(originalQuote);

    console.log(sentence);

    // if (typeof callback === "function") {
    //   callback(output);
    // }
  }

}

module.exports = QuoteGenerator;