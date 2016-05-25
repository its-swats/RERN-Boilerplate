var express = require('express');
var router = express.Router();
var r = require('rethinkdbdash')();

router.get('/likes', function(req, res){
 r.table('likes').get(1).run().then(function(result){
     res.json({likes: result.likeCount})
 })
})

router.get('/', function(req, res){
 res.sendFile(__dirname, 'index.html')
})

module.exports = router