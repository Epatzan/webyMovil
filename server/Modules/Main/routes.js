'use strict';

var express = require('express');
var routes = express.Router();


routes.get('/',function(req, res, next){
res.render('index',{
	title :'Examen WebyMovil',
	layout:'layout/html-struct'

});
});


module.exports = routes;
