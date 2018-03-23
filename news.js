var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function ajouter_recherche()
{
    if (recherches.indexOf($("#zone_saisie").val()) == -1){
        recherches.push($("#zone_saisie").val());
        $("#recherche-stockees").html($("#recherche-stockees").html()+"<p class=\"titre-recherche\"><label>"+$("#zone_saisie").val() +"</label><img src=\"style/croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/></p>");
        $.cookie("recherches", JSON.stringify(recherches), {expires : 1000});
    }
}

function supprimer_recherche(e)
{ 


}


function selectionner_recherche(e)
{ 

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





	






