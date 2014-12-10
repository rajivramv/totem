var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. --> insert the client static page here */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*GET add article page.*/
router.get('/newbooks',function(req,res){
  res.render('newbooks',{title: "Add new books"});
}); 

function queryDB (querystr,doNext){
  foo = new pg.Client({
    user: "wmaykjsckvcfpf",
    password: "_bNvDcUlWanOTHMrYJvunWKZV0",
    database: "d29g4jh8r2taga",
    port: 5432,
    host: "ec2-54-225-136-187.compute-1.amazonaws.com",
    ssl: true
  });
  foo.connect (function(err){
    if (err){
      doNext('Oops...something went while connecting to the database...See the error log below <br\> <h2>Error log:</h2><br\>' + err,-1);
    }
    else{
      foo.query(querystr,function(err,result){
        if (err){
           doNext('Oops...something went wrong in the query to the database...See the error log below <br\> <h2>Error log:</h2><br\>' + err,-1);
        }
        else{
          doNext(0,result);
        }
      });
    }
  });
}
   
router.get('/getbooks',function(req,res){
  queryDB('SELECT * FROM books',function(err,result){
    if(err){
      res.send(err);
    }
    else {
      res.render('getbooks',{
        "docs" : result.rows
      });
    }
  });
});

router.post('/addbooks',function(req,res){
  var title = req.body.title;
  var author = req.body.author;
  var description = req.body.description;
  valuestr = "('" + title + "','" + author + "','" + description + "')";
  
  queryDB('INSERT INTO books VALUES ' + valuestr,function(err,result){
    if(err){
      res.send(err);
    }
    else {
      res.location('newbooks');
      res.redirect('newbooks');
    }
  });
});

//commenting out a working code to add books.
/*
router.post('/addbooks',function(req,res){
  var title = req.body.title;
  var author = req.body.author;
  var description = req.body.description;
  str = "('" + title + "','" + author + "','" + description + "')";  
  
  var pgclient = new pg.Client({
    user: "wmaykjsckvcfpf",
    password: "_bNvDcUlWanOTHMrYJvunWKZV0",
    database: "d29g4jh8r2taga",
    port: 5432,
    host: "ec2-54-225-136-187.compute-1.amazonaws.com",
    ssl: true
  });
  
  pgclient.connect(function(err){
    if(err){
    console.error(err);
    res.send('Oops...something went wrong somewhere...See the error log below <br\>' + err);
    }
    pgclient.query('INSERT INTO books VALUES ' + str,function(err,result){
      if(err){
        console.error(err);
        res.send('Oops...something went wrong somewhere...See the error log below <br\>' + err);
      }
      else{ 
        console.log(result);
        pgclient.end();
        res.location('newbooks');
        res.redirect('newbooks');
      }
    });
  });
});
*/
//Commenting out a working code to getbooks.
/*
router.get('/getbooks',function(req,res){
  var pgclient = new pg.Client({
    user: 'wmaykjsckvcfpf'',
    password: '_bNvDcUlWanOTHMrYJvunWKZV0',
    database: 'd29g4jh8r2taga'',
    port: 5432,
    host: 'ec2-54-225-136-187.compute-1.amazonaws.com',
    ssl: true
  });
  pgclient.connect(function(err){
    if(err){
    console.error(err);
    res.send('Oops...something went wrong somewhere...See the error log below <br\>' + err);
    }
    pgclient.query('SELECT * FROM books',function(err,result){
      if(err){
        console.error(err);
        res.send('Oops...something went wrong somewhere...See the error log below <br\>' + err);
      }
      else{
        //res.send(result);
        res.render('getbooks',{
          "docs" : result.rows
        });
        pgclient.end();
      }
    });
  });
});
*/

//What fun without a Hello, World! to start off with!
/*
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});
*/

//Uncomment when using local MongoDB
/*
router.get('/getbooks',function(req,res){
  var db = req.db;
  var articles = db.get('articles');
  articles.find({},{},function(e,docs){
    res.render('getbooks',{
      "docs" : docs
    });
  });
});
*/

//Uncomment when using local MongoDB
/*
router.post('/addbooks',function(req,res){
  var db = req.db
  
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  
  var articles = db.get('articles')
  
  articles.insert({
    "title" : title,
    "description" : description,
    "author" : author  
  }, function(err,doc){
    if(err){
      res.send("Oops...something went wrong somewhere...");
    }
    else {
      res.location("articles");
      res.redirect("articles");
    }
  });
});*/

module.exports = router;
