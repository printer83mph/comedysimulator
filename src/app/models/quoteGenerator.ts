// import PredicateSyntax from "english-io"
// @ts-ignore
import MovieQuote from "popular-movie-quotes";

class QuoteGenerator {

  static makeQuote() {

    // const originalQuote = MovieQuote.getQuoteByYear(1970, 1972);

    // originalQuote.forEach(quote => {
    //   console.log(`${quote.quote} (${quote.movie}, ${quote.year})`);
    // });

    const quotes = MovieQuote.getQuotesByMovie("The Godfather");

    quotes.forEach((quote: { quote: string; movie: string; year: number; }) => {
      console.log(`${quote.quote} (${quote.movie}, ${quote.year})`);
    });

    // const pred = new PredicateSyntax();
    // let sentence = pred.parse(originalQuote.quote);

    // console.log(sentence);

    // if (typeof callback === "function") {
    //   callback(output);
    // }
  }

}

export default QuoteGenerator;