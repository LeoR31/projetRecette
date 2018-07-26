module.exports = function(app) {

    var cakes = require('../controllers/cakes.controller.js');

    // Ajoute un gâteau à la liste existante de gâteaux. La requête devra contenir le JSON correspondant à la description d’un gâteau
    app.post('/cakes', cakes.create);

    // Renvoie la liste de tous les gâteaux, au format JSON, triée par ordre alphabétique. 
	// Les images ne seront pas affichées dans la liste (même leur URL).
    app.get('/cakes', cakes.getAll);

    // Renvoie les détails d’un gâteau au format JSON. Les images ne seront pas affichées en tant qu’image,
	// mais leur URL devra être présente dans le JSON retourné.
    app.get('/cakes/:id', cakes.getByID);

    // Réinitialise la liste actuelle de gâteaux à la liste initiale des 5 gâteaux
    app.put('/cakes/init', cakes.init);

    // Supprime un gâteau de la liste
    app.delete('/cakes/:id', cakes.delete);
}