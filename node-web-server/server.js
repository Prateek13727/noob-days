const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', hbs);
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log(err);
  });
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
  res.render('about.hbs', {
      title: 'About'
  });
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
      title: 'My Home Page'
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`)
});
