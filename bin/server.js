const express = require("express");
const morgan = require("morgan");
const funnyGenerator = require("../models/funny-generator");
const app = express();

const port = 3000;

app.set('view engine', 'pug');

const liveMorgan = process.env.NODE_ENV === 'production' ? morgan('tiny') : morgan('dev');
app.use(liveMorgan);

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('/joke', (req, res) => {
  res.json(funnyGenerator.YoMamaJoke());
});

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});