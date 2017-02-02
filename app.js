// Step 1: Create project 👉 yarn init
// Step 2: Add Express package 👉 yarn add express
// Step 3: Require Express in app.js
// Step 4: Create a get route
// Step 5 (optional): Install nodemon in developement dependencies 👉 yarn add -D nodemon
// Step 6 (optional): Create npm scripts in package.json to start app and debug app
// "scripts": {"start": "nodemon app.js", "debug": "node --inspect app.js"}
// run with commands 👉 npm start & npm run debug
// Step 7: Setup logger middleware, morgan. Install with 👉 yarn add morgan
// Step 8: Install ejs templating language 👉 yarn add ejs
// Step 9: Install body-parser middleware (form parsing json & forms) 👉 yarn add body-parser

// require is normally a node only function that allows
// to load local javascript files and download packages
const Express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const pg = require('pg');

// Load routers from router folder
const home = require('./routes/home');

// Create an instance of the Express by calling the Express function
const app = Express();

// Configure Express app to use ejs templating for our app's view engine
app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())


app.use(function(req, res, next){
  if (!req.cookies.luckyNumber) {
    res.cookie('luckyNumber', 42, {maxAge: 2592000000});
  }
  console.log(req.cookies);
 next();
});



// unlike get which only intercepts get method requests
// use will intercept all requests
app.use(logger('dev'))
// we're using morgan with the dev setting which will log information in a nice
// concise for developement

// the request object (usually abbreviated to req) represents everything the
// browser is asking our node server
// the response object represent the object that contains everything our node
// will send back to the browser such as the html, files, status code, etc.

// the first argument to app.get is the relative url to our server
// (i.e. http://localhost:4000/)
app.get('/hello-word', function (request, response) {
  // To debug, start the server with `node --inspect app.js` instead of `node app.js`
  // Put `debugger` when you want node to pause execution of your program
  // debugger
  response.send('Hello World')
})

app.use('/', home);

/*
app.get('/', function (req, res) {
  // 👇 renders an template named index from the views/ folder
  res.render('index');
})
*/

//app.post
//app.delete

const PORT = 4545;
app.listen(PORT, function () { console.log(`Server listening on http://localhost:${PORT}`)})










/* */
