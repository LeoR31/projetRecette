var fs = require('fs');
var cakesModel = require('../modeles/cakes.js');

var utils = require('../utils/utils.js');
const cakesData = 'app/data/cakes.json';
const cakesDataTemplate = 'app/data/cakesTemplate.json';

//TODO
// Ajoute un gâteau à la liste existante de gâteaux. La requête devra contenir le JSON correspondant à la description d’un gâteau
exports.create = function(req, res) {
    if(!req.body.title || !req.body.desc || !req.body.rating || !req.body.image) {
       res.end( "Vous devez saisir la description complete de la recette (title, desc, rating, image).");  
    }else {

	    // Cree un nouveau gateau selon le modele
	    const cake = new cakesModel({
	        title: req.body.title,
	        desc: req.body.desc || "N/A",
	        rating: req.body.rating || "N/A",
	        image: req.body.image || "N/A"
	    });

		fs.readFile(cakesData, 'utf8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {

			obj = JSON.parse(data);
			obj.push(cake);
			cakesList = JSON.stringify(obj, null, 4);			
			fs.writeFile(cakesData, cakesList, 'utf8', function (err) {
				if (err) {
					return console.log(err);
				}		
			}); 		
			console.log( "--------- Gateau ajoute : --------- \n" + JSON.stringify(cake, null, 4));
			res.json({'SUCCESS': cake});
		}});
	}
};



// Renvoie la liste de tous les gâteaux, au format JSON, triée par ordre alphabétique. 
// Les images ne seront pas affichées dans la liste (même leur URL).
	exports.getAll = function(req, res,callback) {
		fs.readFile(cakesData, 'utf8', function readFileCallback(err, data){

			if (err){
				console.log(err);
				res.json({'ERROR': err});
			} else {
			obj = JSON.parse(data); 
			
			//Récupération du parametre order de la requete GET 
			//Retourne la liste triee en fonction du parametre saisi
			//Par défaut la liste est triee par ordre alphabetique
			if (req.query.order == 'rating') {
				utils.triParNote(obj);	
				json = JSON.stringify(obj, utils.hideImg, 4);
				console.log("------ Liste de toutes les recettes triees par note -------: \n" + json);
				//res.end("------ Liste de toutes les recettes triees par note -------: \n" + json);
				res.set({'Content-Type': 'application/json; charset=utf-8'}).send(json);
			} else {
				utils.triParDefaut(obj);
				json = JSON.stringify(obj, utils.hideImg, 4); 
				console.log("------ Liste de toutes les recettes triees par ordre alphabetique -------: \n" + json);
				//res.end("------ Liste de toutes les recettes triees par ordre alphabetique -------: \n" + json); 
				res.set({'Content-Type': 'application/json; charset=utf-8'}).send(json)
			}

		}});	
	};
	

// Renvoie les détails d’un gâteau au format JSON. Les images ne sont pas affichées en tant qu’image,
// mais leur URL est présente dans le JSON retourné.
exports.getByID = function(req, res, callback) {
	
	fs.readFile(cakesData, 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
			res.json({'ERROR': err});
		} else {
			if(!data[req.params.id-1]) {
            	res.end( "-------- Aucun resultat trouve pour l'id :" + req.params.id +" --------");  
        	}
        	else{ 
				obj = JSON.parse(data);
				var Cakes = obj[req.params.id-1];
				console.log("-------- Resultat trouve : -------- \n" + JSON.stringify(Cakes, null, 4));
				res.set({'Content-Type': 'application/json; charset=utf-8'}).send(JSON.stringify(Cakes, null, 4));
		}
	}});
};




// Réinitialise la liste actuelle de gâteaux à la liste initiale des 5 gâteaux
exports.init = function(req, res) {
	
	fs.readFile(cakesDataTemplate, 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
			res.json({'ERROR': err});
		} else {
			obj = JSON.parse(data);
			cakesList = JSON.stringify(obj, null, 4);				
				fs.writeFile(cakesData, cakesList, 'utf8', function (err) {
					if (err) {
						return console.log(err);
					}
					console.log("Liste reinitialisee avec succes !");
					res.json({'INIT': data});
				}); 
	}});
};

// Supprime un gâteau de la liste
exports.delete = function(req, res) {
	fs.readFile(cakesData, 'utf8', function readFileCallback(err, data){
		if (err){
			console.log(err);
			res.json({'ERROR': err});
		} else {

		obj = JSON.parse(data);
		var deleteCakes = obj[req.params.id];
		obj.splice(req.params.id,1);
		cakesList = JSON.stringify(obj, null, 4);			
		fs.writeFile(cakesData, cakesList, 'utf8', function (err) {
			if (err) {
				return console.log(err);
			}		
		}); 		
		console.log( "--------- Gateau supprime : --------- \n" + JSON.stringify(deleteCakes, null, 4));
		res.json({'REMOVED': deleteCakes});
	}});	
	
};


