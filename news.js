var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    if (recherches.indexOf($("#zone_saisie").val()) == -1){
        recherches.push($("#zone_saisie").val());
        $("#recherches-stockees").html($("#recherches-stockees").html() + "<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">" + $("#zone_saisie").val() + "</label><img src=\"style/croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
        $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});
    }
}

function supprimer_recherche(e)
{ 
    var parentNode = e.parentNode;
	recherches.splice(recherches.indexOf(parentNode.firstChild.innerHTML));
	e.parentNode.remove();
	$.cookie("recherches", JSON.stringify({recherches}), { expires: 1000 });
}


function selectionner_recherche(e)
{ 
    var queryValue = e.parentNode.firstChild.innerHTML;
    $("#zone-saisie").val(queryValue);
    recherche_courante = queryValue;
}


function init()
{

}


function rechercher_nouvelles()
{
	
	
}


function maj_resultats(res)
{

	
}


function sauver_nouvelle(e)
{
	
}


function supprimer_nouvelle(e)
{
	
}





	






