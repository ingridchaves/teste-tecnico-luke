const BASE_URL = 'https://swapi.co/api/people/1/';

var DISTANCIA = 0;

function resultado (){
	DISTANCIA = document.getElementById("dist").value;
		console.log(DISTANCIA);
	document.getElementById("resultado").innerHTML = ""	;

	request(BASE_URL, function(dados) {

		var starships = dados.starships;
	 
	 	for (var i=0; i<starships.length; i++){
	 		console.log(starships[i]);
	 	
	 		request(starships[i], mostrarNaves)
	 	}
	});
}

function mostrarNaves(starship){	
	var capacidade = starship.MGLT;
	var paradas = calcularParadas (DISTANCIA, capacidade);
	console.log(starship.name,paradas);

	//AQUI VAMOS INSERIR AS PARADAS NO HTML//
	result = document.getElementById("resultado")
	var respostas = result.innerHTML

	respostas = respostas + 
		`<div id="respostas" class="respostas">
			<div class="name-nave" id="nome"> <img src="img/nav.png">` + starship.name + `</div>
			<div class="paradas" id="paradas">` + paradas + `</div>
		</div>`;

	result.innerHTML = respostas

}
function  calcularParadas (distancia, capacidade) {
	return distancia/capacidade;
}



function request(url, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       callback(JSON.parse(xhttp.responseText))
	    }
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}