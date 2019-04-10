const BASE_URL = 'https://swapi.co/api/people/1/';

var DISTANCIA = 0;

function resultado() {
	document.getElementById("resultado").innerHTML = "";
	document.getElementById("dist").style.border = "2px solid white";

	DISTANCIA = document.getElementById("dist").value;

	if(DISTANCIA != "") {

		request(BASE_URL, function(dados) {
			var starships = dados.starships;

			for (var i=0; i<starships.length; i++) {	
				request(starships[i], mostrarNaves);
			}
		});
	} else {
		document.getElementById("dist").style.border = "2px solid red";
	}

}


function mostrarNaves(starship){	
	var capacidade = starship.MGLT;
	var consumables = starship.consumables;
	var consumablesHoras = converteHoras (consumables);
	var paradas = calcularParadas (DISTANCIA, capacidade, consumablesHoras);
	paradas = Math.round(paradas);

	result = document.getElementById("resultado");
	var respostas = result.innerHTML;

	respostas +=
	`<div id="respostas" class="respostas">
	<div class="name-nave" id="nome"> <img src="img/nav.png">` + starship.name + `</div>
	<div class="paradas" id="paradas">` + paradas + `</div>
	</div>`;

	result.innerHTML = respostas;
}


function calcularParadas(distancia, capacidade, consumablesHoras) {
	return distancia/capacidade/consumablesHoras;
}


function converteHoras(consumables) {
	consumables = consumables.toLowerCase();
	var numero = consumables.split(" ")[0];
	var periodo = consumables.split(" ")[1];
	var consumablesHoras = 0;

	if (periodo.includes("year")){
		//quantidade de horas em um ano é 8760
		consumablesHoras = numero*8760;
	} 

	if (periodo.includes("month")){
		//quantidade de horas em um mês é 730
		consumablesHoras = numero*730;
	} 

	if (periodo.includes("week")){
		//quantidade de horas em uma semana é 168
		consumablesHoras = numero*168;
	} 

	if (periodo.includes("day")){
		//quantidade de horas em um dia é 24
		consumablesHoras = numero*24;
	} 

	if (periodo.includes("hour")){
		//quantidade de horas em uma hora 1
		consumablesHoras = numero*1;
	} 

	return consumablesHoras;

}


function request(url, callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(JSON.parse(xhttp.responseText));
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}