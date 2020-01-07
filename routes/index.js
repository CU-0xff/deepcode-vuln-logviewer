var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  if(process.env.logEntryHistory && process.env.logEntryHistory.length > 0) {
    res.rendr('index', { title: process.env.logEntryHistory[process.env.logEntryHistory.length]});
  }
  else {
    res.render('index', { title: 'Express' });
  }
});

/* GET LOG ENTRIES BASED ON SELECTED NODE */
router.get('/logEntries', function(req, res) {
  var node = req.query.node || "Node0";
  if(process.env.logEntryHistory) {
    process.env.logEntryHistory.push(node);
  }
  else {
    process.env.logEntryHistory = [node];
  }

  var db = req.db;

  var collection = db.get(node);

  collection.find({}).then(function(docs) {
    res.render('logEntries', {"nodeName" : node, "log" : docs});
  });
});


module.exports = router;
