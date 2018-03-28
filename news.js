var recherches=[];//tableau contenant des chaines de caracteres correspondant aux recherches stockees
var recherche_courante;// chaine de caracteres correspondant a la recherche courante
var recherche_courante_news=[]; // tableau d'objets de type resultats (avec titre, date et url)

function init()
{
    if(document.cookie){
        var cookieQ = getCookie("recherches");
            var array = JSON.parse(cookieQ);
            for (var i=0; i<array.length;i++){
                recherches.push(array[i]);
                $('#recherches-stockees').html($('#recherches-stockees').html() +"<p class=\"titre-recherche\"><label onclick=\"selectionner_recherche(this)\">"+array[i]+"</label><img src=\"croix30.jpg\" class=\"icone-croix\" onclick=\"supprimer_recherche(this)\"/> </p>");
            }
    
      }
}

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
    var p = e.parentNode;
	var i = recherches[recherches.indexOf(p.firstChild.innerHTML)];
	recherche_courante = i;
	$('#zone_saisie').val(recherche_courante);
}

function rechercher_nouvelles(){
    $("#result").html="";
    document.getElementById('wait').style.display="block";
	$.ajax({
		url : 'search.php',
		type :'GET',
		data : {data : $('#zone_saisie').val()},
		success : maj_resultats
	});
}

function maj_resultats(res)
{
    document.getElementById('wait').style.display = "none";
	var search = JSON.parse(res);
	for (var i=0; i<search.length; i++){
		var url = decodeEntities(search[i].url);
		$('#resultats').html($('#resultats').html() + "<p class=\"titre_result\"><a class=\"titre_news\" href="+url+" target=\"_blank\">"+search[i].titre+"</a><span class=\"date_news\">"+format(search[i].date)+"</span><span class=\"action_news\" onclick=\"sauver_nouvelle(this)\"><img src=\"style/horloge15.jpg\"/></span></p>");
	}
	
}


function sauver_nouvelle(e)
{
	e.firstChild.setAttribute("src","style/disk15.jpg");
	e.setAttribute("onclick","supprimer_nouvelle(this)");

	var object = {
		title : e.parentNode.firstChild.textContent,
		date : e.parentNode.firstChild.nextSibling.textContent,
		url : e.parentNode.firstChild.getAttribute("href")
	};

	if (indexOf(recherche_courante_news,object) == -1){
		recherche_courante_news.push(object);
		var cookie = JSON.stringify(recherche_courante_news);
		setCookie(object.titre,cookie,1000);
	}
}


function supprimer_nouvelle(e)
{
	
}





	






