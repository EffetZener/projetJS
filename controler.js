var controler={};

controler.init = function(){
	view.set_zone_saisie("");
	if(document.cookie){
    var cookie = getCookie("recherches");
    var array = JSON.parse(cookie);
    for (var i=0; i<array.length;i++){
        model.init(array[i]);
        view.init(array[i]);
    }
  }
};

controler.ajouter_recherche = function(){
    var search = view.get_zone_saisie();  
    if(model.recherches.indexOf(search) == -1){
        model.ajouter_recherche(search);
        view.reset_recherche();
        for(var i=0; i<model.recherches.length; i++){
            view.ajouter_recherche(model.recherches[i]);
        }
    }
  };

controler.supprimer_recherche = function(e){
    var parentNode = view.get_parent(e);
    var gr_parent = view.get_parent(parentNode);
    view.removeChild(gr_parent,parentNode);
    model.supprimer_recherche(parentNode);
  };


controler.selectionner_recherche = function(e){
    model.selectionner_recherche(view.get_parent(e));
    view.selectionner_recherche();  
    if(typeof localStorage!='undefined') {
        view.reset_div_resultats();
        model.recherche_courante_news = JSON.parse(localStorage.getItem(e.firstChild.textContent));
        console.log(model.recherche_courante_news);
        for (var i=0; i<model.recherche_courante_news.length;i++){
            var url = model.recherche_courante_news[i].url;
            var titre = model.recherche_courante_news[i].titre;
            var date = model.recherche_courante_news[i].date;
            view.affiche_nouvelles_enregistrees(url,titre,date);
        }
      }
    else {
        alert("Erreur : localStorage n'est pas supporté");
    }
  };

controler.ajax_get_request = function(callback,url,async){
    var xhr = new XMLHttpRequest();  
    xhr.onreadystatechange = function() {
        if ((xhr.readyState==4) && (xhr.status == 200)){
            callback(xhr.responseText);
        }
    };
    xhr.open("GET", url, async);
    xhr.send();
};
  
controler.maj_resultats = function(res){
    view.display_div_wait("none");
    var search = JSON.parse(res);
    for (var i=0; i<search.length; i++){
        var url = decodeEntities(search[i].url);
        if(model.nouvellePresente(search[i]) == true){
            view.affiche_nouvelles_enregistrees(url,search[i].titre,format(search[i].date));
        }
        else{
            view.affiche_nouvelles(url,search[i].titre,format(search[i].date));
        }
      }
  };

controler.rechercher_nouvelles = function(){
    model.rechercher_nouvelles();
    view.clear_div_resultats();
    view.display_div_wait("block");
    var url = "search.php?data="+encodeURIComponent(view.get_zone_saisie());
	controler.ajax_get_request(controler.maj_resultats,url,false);
};

controler.sauver_nouvelle = function(e){
    view.sauver_nouvelle(e);
	var obj = model.create_object(view.get_titreNouvelle(e),view.get_dateNouvelle(e),view.get_urlNouvelle(e));
	model.sauver_nouvelle(obj);
	controler.ajouter_recherche();
};

controler.supprimer_nouvelle = function(e){
    view.supprimer_nouvelle(e);
    var object = model.create_object(view.get_titreNouvelle(e),view.get_dateNouvelle(e),view.get_urlNouvelle(e));
	model.supprimer_nouvelle(object);
};