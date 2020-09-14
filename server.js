const express = require("express");
const morgan = require("morgan");
const app = express();

const port = 3000;

app.set('view engine', 'pug');

app.use(process.env.NODE_ENV == 'production' ? morgan('tiny') : morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.use(express.static('dist'));

app.listen(port, () => {
  console.log(`Now listening on port ${port}.`);
});