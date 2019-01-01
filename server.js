const express = require('express');
const hbs = require('hbs');
const os = require('os');
var username = os.userInfo().username;

const port = process.env.PORT || 3000;

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

// app.use((req, res, next) => {
//   res.render('./maintenance', {
//     title: 'Maintenance Page'
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('toUpper', (string) => {
  return string.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('./home', {
    title: 'Home Page',
    username: username
  });
});

app.get('/about', (req, res) => {
  res.render('./about', {
    title: 'About Page',
    username: username
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorCode: "Invalid Request",
    errorMessage: "Invalid URL provided."
  });
});

app.listen(port, () => {
  console.log('Server is up and running on port ' + port);
});
