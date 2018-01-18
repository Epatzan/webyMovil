'use strict';

var express = require('express');
var multer = require('multer');
var  moment = require('moment');
var fs  = require('fs');
var routes = express.Router();
var acl = require(_config.SystemPath + '/config/middleweres');
var passport = require('passport');
var mysql = require('mysql');
var http  = require('http');
var upload = multer({dest: './public/uploads'});
/** Coneccion con mysql user y password**/
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Catalogo"
});

routes.get('/imagen',function (req, res){
	res.render('Dashboard/imagen-post',{
		title: 'create',
		layout: 'layout/dashboard'
	});
});
routes.post('/imagen', upload.single('file'),function (req, res){

});

//routh de Index

routes.get('/',function (req, res){
	res.render('Dashboard/index_dashboard',{
		title:'Dashboard',
		 layout: 'layout/dashboard'
	});

});
//routh de Consulta
routes.get('/Consulta',function (req , res){


  con.connect(function(err) {
  if (err) throw err;
 con.query("SELECT Nombre , cantidadDisponible , Precio , Caracteristica FROM Productos", function (err, rows, fields) {
    if (err) throw err;
   console.log(rows);
 var string  = JSON.stringify(rows);
 var json = JSON.parse(string);
 console.log(json);
   //
   res.render('Dashboard/dashboard-consulta',{
     title:'Consulta de Productos',
     layout:'layout/dashboard',
     data: json
   });
   //
    });
  });

});
routes.post('/Consulta',function (req , res){
  con.connect(function(err) {
  if (err) throw err;
 con.query("SELECT Nombre FROM Productos WHERE iD = 4", function (err, result, fields) {
    if (err) throw err;
   console.log(result);
    });
  });
});
//routh de estadisicas
routes.get('/statistics',function (req, res){
		res.render('Dashboard/dashboard-statistics',{
		title:'Estadisticas',
		layout:'layout/dashboard'
	});

});
//routh de Eliminar
routes.get('/Eliminar',function (req, res){
		res.render('Dashboard/dashboard-media',{
		title:'Seccion de media',
		layout:'layout/dashboard'
	});
  con.connect(function(err) {
  if (err) throw err;

 con.query("DELETE  FROM Productos ", function (err, result, fields) {
    if (err) throw err;
   console.log(result);
    });
  });
});

//routhes de Creacion de producto
routes.get('/create',function (req, res){
  res.render('Dashboard/create-post',{
   title: 'create',
   layout: 'layout/dashboard',

   });
});
routes.post('/create',function (req, res){

  var data = {
   Registered:req.body.registered,
   TraidinName:req.body.Trading,
   AbN:req.body.abn,
   Name:req.body.nombre,
   DateBirth:req.body.descripcion,
   PhoneNumber:req.body.cantidadDisponible,
   Address:req.body.Peso,
   TaxFile:req.body.Caracteristica,
   DateEmployer:req.body.Precio,
   EmployerStatus:req.body.image,
   Other:req.body.Tienda,
   OrdinaryHours:req.body.Vendedor,
   MethodPay:req.body.Puntaje,
   PayPeriod:req.body.condicionProducto,
   Traineeship:req.body.Ubicacion,
   Award:req.body.Bodega,
   JobTitle:req.body.tiempoEntrega
  };

  console.log(data);
  fs.writeFile('File.txt',JSON.stringify(data),function(err){
    if(err){
      return console.log(err);
    }
  });
});


//routhes de  edicion
routes.get('/edit',function (req, res){
	res.render('Dashboard/index_dashboard',{
		title:'edit',
		layout:'layout/edit-post'
	});


});
routes.put('/edit/:id',function (req, res){
});
module.exports = routes;
