var express = require("express");
	var app = express();
	var mongojs = require("mongojs");
	var db = mongojs('Resume',['Resume']);
	var bodyParser = require("body-parser");

	app.use(bodyParser.json());

	app.use(express.static(__dirname + "/public"));

	app.get('/Resume',function(req,res){
		console.log("I received a GET request");
		db.Resume.find(function(err, docs){
			console.log(docs);
			res.json(docs);
		});
	});


	app.post("/Resume",function(req, res){
		console.log(req.body);
		db.Resume.insert(req.body,function(err,docs){
			res.json(docs);
		});
	});


	app.delete('/Resume/:id',function(req,res){
		var id = req.params.id;
		console.log(id);
		db.Resume.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
			res.json(doc);
		});
	});

	app.get('/Resume/:id',function(req,res){
		var id = req.params.id;
		console.log(id);
		db.Resume.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
			res.json(doc);
		});
	});

	app.put('/Resume/:id', function(req,res){
		var id = req.params.id;
		console.log(id);
		db.contactlist.findAndModify(
			{ query: {_id: mongojs.ObjectId(id)},
		    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
			  new: true
			}, function(err,doc){
				 res.json(doc);
			 });
	});

	app.listen(8080);
	console.log("Server running on port 8080");
