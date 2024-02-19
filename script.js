async function init() {
  loadPokemon();
}

async function loadPokemon() {
  for (let i = 1; i <= 10; i++) {
    // 898
    let pokemonId = i;
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log("loaded Pokemon", responseAsJson);
    let pokemonName = responseAsJson["species"]["name"];
    console.log("pokemon name ist", pokemonName);
  }
}

function loadContent() {


    
}