var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET LOG ENTRIES BASED ON SELECTED NODE */
router.get('/logEntries', function(req, res) {
  var node = req.query.node || "Node0";

  var db = req.db;

  var collection = db.get(node);

  collection.find({}).then(function(docs) {
    res.render('logEntries', {"nodeName" : node, "log" : docs});
  });
});

module.exports = router;
