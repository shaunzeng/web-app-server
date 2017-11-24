var express = require('express');
var router = express.Router();
var { graphql, buildSchema } = require('graphql');
var ncSchema = require('./schema.js');



/* GET home page. */
router.post('/', function(req, res, next) {
	console.log(req.body.query, ' content sent ?');

	graphql(ncSchema, req.body.query).then(function(response){
		res.send(response);
		return;
	});
  
});

module.exports = router;