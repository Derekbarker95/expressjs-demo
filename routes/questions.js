const Express = require('express');
const router = Express.Router();
const pg = require('pg');


var config = {
  user: 'derekbarker', //env var: PGUSER
  database: 'awsome_answers_nodejs', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

const allQuestions = [
  {id: 12, title: "abc", description: "yo"},
  {id: 13, title: "a123", description: "aloha"},
  {id: 14, title: "abc123", description: "gunentag"}
]

router.get('/', function(req, res) {
  pool.connect(function(err, client, done){
    if (err){
      console.log("problem connecting to pool");
    }
    client.query('SELECT * FROM questions;', function(qerr, result){
      done();
      if (qerr){
        return console.error("problem getting query");
      }
      res.render('questions/index', {questions: result.rows});
    });
  });
});

router.get('/:id', function(req, res) {
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM questions WHERE ID=$1;',[req.params.id], function(qerr, result){
      done();
      res.render('questions/show',{question: result.rows[0]});
    });
  });
});


module.exports = router;
