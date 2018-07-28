
	//Retourne la liste passée en parametre triee par ordre alphabetique
	exports.triParDefaut = function(obj) {
			obj.sort(function(a, b) {
			var titleA = a.title.toUpperCase();
			var titleB = b.title.toUpperCase();
			return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
		});	
	}

	
	//Retourne la liste passée en parametre triee par note
	exports.triParNote = function(obj) {
			obj.sort(function(a, b) {
			var noteA = a.rating;
			var noteB = b.rating;
			return  (noteA < noteB) ? -1 : (noteA > noteB) ? 1 : 0 || (a.title>b.title) ;
		});	
	}	
	
	//Fonction permettant de masquer l'attribut "image" lors de l'affichage du JSON.
	exports.hideImg = function(key, value) {
	  // Filtering out properties
	  if (key == 'image') {
		return undefined;
	  }
	  return value;
	}
