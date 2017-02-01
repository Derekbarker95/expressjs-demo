// this is a different file than app.js
// we need to re-require any package from that file that
// we will need
const Express = require('express');
const router = Express.Router()

const THINGS = [
  'Snowball',
  'Rain',
  'Ski',
  'Smiley',
  'Sword',
  'The Mountain',
  'Spear'
]

router.get('/', function (req, res) {
  res.render('index');
})

router.get('/contact', function (req, res) {
  // the contact template expects there to be an object the following properties
  // if we don't pace placeholder, it'll break
  res.render('contact', {"full_name": "", email: "", comment: ""});
})

router.post('/contact', function (req, res) {
  // body-parser middleware parsed the form data from /contact
  // into a javascript object and assigned to the prop. body of the request object, req
  const params = req.body;
  params.full_name = "Bozzo";
  res.render('contact', params); // 👈 syntax sugar for {params: params}
})

router.get('/about', function (req, res) {
  // the second argument of render is an object where
  // its properties will become the name of variables inside
  // the templates
  // (e.g. the following will create a variable, things, for use in the about.ejs file)
  res.render('about', {things: THINGS});
})


// when this file will be required, it will receive the object
// assigned to module.exports
module.exports = router;
