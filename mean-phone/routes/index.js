var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', objective: 'Learn the MEAN stack and make cool apps',
  timetable: 'May 2nd, 2015' });
});

module.exports = router;
