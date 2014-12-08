var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/articles',function(req,res){
  var db = req.db;
  var articles = db.get('articles');
  articles.find({},{},function(e,docs){
    res.render('articles',{
      "docs" : docs
    });
  });
});

/*GET add article page.*/
router.get('/newarticle',function(req,res){
  res.render('newarticle',{title: "Add new article"});
}); 

router.post('/addarticle',function(req,res){
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
});

module.exports = router;
