var view ={};

view.init = function(search){
  $('#recherches-stockees').html($('#recherches-stockees').html() + "<p class=\"titre-recherche\"><label onclick=\"controler.selectionner_recherche(this)\">"+search+"</label><img src=\"style/croix30.jpg\" class=\"icone-croix\" onclick=\"controler.supprimer_recherche(this)\"/> </p>");
};

view.get_zone_saisie = function(){
  return $('#zone_saisie').val();
};

view.set_zone_saisie = function(s){
  $('#zone_saisie').val(s);
};

view.get_parent = function(element){
  return element.parentNode;
};

view.removeChild = function(parent,enfant){
  parent.removeChild(enfant);
};

view.ajouter_recherche = function(r){
  $('recherches-stockees').html($('recherches-stockees').html()+ "<p class=\"titre-recherche\"><label onclick=\"controler.selectionner_recherche(this)\">"+r+"</label><img src=\"style/croix30.jpg\" class=\"icone-croix\" onclick=\"controler.supprimer_recherche(this)\"/> </p>");
};

view.reset_recherche = function(){
  $('#recherches-stockees').html("");
};

view.selectionner_recherche = function(){
  var saisie = view.get_zone_saisie();
  saisie = model.recherche_courante;
  view.set_zone_saisie(model.recherche_courante);
};

view.clear_div_resultats = function(){
  $('#resultats').html("");
};

view.display_div_wait = function(display){
  if (display == "block"){
    document.getElementById('wait').style.display = "block";
  }
  else{
    document.getElementById('wait').style.display = "none";
  }

};

view.affiche_nouvelles_enregistrees = function(url,title,date){
  $('#resultats').html($('#resultats').html()+ "<p class=\"titre_result\"><a class=\"titre_news\" href="+url+" target=\"_blank\">"+title+"</a><span class=\"date_news\">"+date+"</span><span class=\"action_news\" onclick=\"controler.supprimer_nouvelle(this)\"><img src=\"style/disk15.jpg\"/></span></p>");
};

view.affiche_nouvelles = function(url,title,date){
  $('#resultats').html($('#resultats').html()+ "<p class=\"titre_result\"><a class=\"titre_news\" href="+url+" target=\"_blank\">"+title+"</a><span class=\"date_news\">"+date+"</span><span class=\"action_news\" onclick=\"controler.sauver_nouvelle(this)\"><img src=\"style/horloge15.jpg\"/></span></p>");
};

view.reset_div_resultats = function(){
  $('#resultats').html("");
};

view.get_titreNouvelle = function(elem){
  return elem.parentNode.firstChild.textContent;
};

view.get_dateNouvelle = function(elem){
  return elem.parentNode.firstChild.nextSibling.textContent;
};

view.get_urlNouvelle = function(elem){
  return elem.parentNode.firstChild.getAttribute("href");
};

view.sauver_nouvelle = function(e){
  e.firstChild.setAttribute("src","style/disk15.jpg");
	e.setAttribute("onclick","controler.supprimer_nouvelle(this)");
};

view.supprimer_nouvelle = function(e){
  e.firstChild.setAttribute("src","style/horloge15.jpg");
	e.setAttribute("onclick","controler.sauver_nouvelle(this)");
};