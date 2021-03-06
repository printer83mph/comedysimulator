const movieQuotes = require("popular-movie-quotes");
const natural = require("natural");
const conjugate = require("conjugate");
const tensify = require("tensify");

const lang = "EN";
const defaultCategory = "N";

const tokenizer = new natural.WordPunctTokenizer();

const lexicon = new natural.Lexicon(lang, defaultCategory);
const ruleSet = new natural.RuleSet(lang);
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const FunnyGenerator = {};

FunnyGenerator.YoMamaJoke = () => {
  // let nouns = [];
  let adjectives = [];
  let verbs = [];

  let quoteData;

  let iterations = 0;
  while (adjectives.length === 0 || verbs.length === 0) {

    quoteData = movieQuotes.getSomeRandom(1)[0];

    const words = tagger.tag(tokenizer.tokenize(quoteData.quote)).taggedWords;

    // nouns = getPartsOfSpeech(words, "NNP");
    adjectives = getPartsOfSpeech(words, "JJ");
    verbs = getPartsOfSpeech(words, "VB", "VBD", "VBN", "VBG");
    // todo: add remaining sentence after the verb to the joke

    iterations++;
  }
  console.log(`Created Yo Mama joke in ${iterations} iterations.`)

  return {
    joke: `Yo mama SO ${adjectives[0].toUpperCase()} that she ${tensify(conjugate("he", verbs[0])).past.toUpperCase()}`,
    originalQuote: quoteData.quote
  }
}

function getPartsOfSpeech(taggedWords, ...pos) {
  const out = [];
  for (let word of taggedWords) {
    if (pos.indexOf(word.tag) !== -1) {
      out.push(word.token)
    }
  }
  return out;
}

module.exports = FunnyGenerator;