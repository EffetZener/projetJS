var model = {};
model.recherche_courante="";
model.recherches=[];
model.recherche_courante_news=[];

model.init = function(rech){
  model.recherches.push(rech);
};

model.ajouter_recherche = function(rech){
  model.recherche_courante = rech;
  model.recherches.push(model.recherche_courante);
  model.recherches.sort();
  localStorage.setItem("recherches",JSON.stringify(model.recherches)); //on charge la recherche en localstorage
  /*var cookieData = JSON.stringify(model.recherches);
  setCookie("recherches",cookieData,1000);*/
};

model.supprimer_recherche = function(p){
  model.recherches.splice(model.recherches.indexOf(p.firstChild.innerHTML),1);
  var obj_storage = JSON.stringify(model.recherches);
	localStorage.setItem("recherches",obj_storage);
  /*var cookieData = JSON.stringify(model.recherches);
	setCookie("recherches",cookieData,1000);*/
};

model.selectionner_recherche = function(p){
    model.recherche_courante = model.recherches[model.recherches.indexOf(p.firstChild.innerHTML)];
};

model.rechercher_nouvelles = function(saisie){
  if(typeof localStorage!='undefined') {
    model.recherche_courante_news = JSON.parse(localStorage.getItem(saisie)); //on recupère les données en localstorage
    if (model.recherche_courante_news === null) { 
      model.recherche_courante_news = []; //si le tableau est null on le réinitialise
	  }
	else {
		model.recherche_courante_news=[] //si le tableau est null on le réinitialise;
	}
};

model.nouvellePresente = function(nveau){
  var array = model.recherche_courante_news;
  var bool = false;
  if(array!=null){
    for(var i=0; i<array.length; i++){
      var savestate = array[i];
      if((savestate.titre == nveau.titre) && (savestate.date == format(nveau.date))){
        bool = true;
      }
    }
  }
  return bool;
};
model.create_object = function(titreObj,dateObj,urlObj){
  var obj = {
		titre: titreObj,
		date: dateObj,
		url: urlObj
	};
  return obj;
};

model.sauver_nouvelle = function(news){
  if (indexOf(model.recherche_courante_news, news) == -1){
    model.recherche_courante_news.push(news);
    localStorage.setItem(view.get_zone_saisie(),JSON.stringify(model.recherche_courante_news));
  }
  /*var cookieVal = JSON.stringify(model.recherche_courante_news);
  setCookie(model.recherche_courante,cookieVal,1000);*/
};

model.supprimer_nouvelle = function(o){
	model.recherche_courante_news.splice(indexOf(model.recherche_courante_news,o),1);
  localStorage.setItem(model.recherche_courante,JSON.stringify(model.recherche_courante_news));
  /*var cookieVal = JSON.stringify(model.recherche_courante_news);
	setCookie(obj.titre,cookieVal,1000);*/
};
