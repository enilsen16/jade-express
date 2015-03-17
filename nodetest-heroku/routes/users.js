var express = require('express');
var router = express.Router();

router.get('/userlist', function(req, res) {
  var db = req.db;
  db.collection('userlist').find().toArray(function (error, items) {
    res.json(items);
  });
});

router.post('/adduser', function(req, res) {
  var db = req.db;
  db.collection('userlist').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var userToDelete = req.params.id;
  db.collection('userlist').removeById(userToDelete, function (error, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + error });
  });
});
module.exports = router;
