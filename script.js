// Globale Variablen für den Start- und Endindex der geladenen Pokémon
let start = 1;
let end = 30;
let pokemonArray = [];

// Funktion zum Initialisieren der Seite
async function init() {
  await loadInitialPokemon();
}

// Funktion zum Laden der ersten Pokémon
async function loadInitialPokemon() {
  await loadPokemon();
}

// Funktion zum Laden von Pokémon basierend auf dem Start- und Endindex
async function loadPokemon() {
  for (let i = start; i <= end; i++) {
    // Füge die Pokémon-Karte hinzu, nachdem die Daten von der API abgerufen wurden
    await addPokemonCard(i);
  }
}

// Funktion zum Hinzufügen einer Pokémon-Karte zum Hauptcontainer
async function addPokemonCard(pokemonIndex) {
  let pokemonData = await fetchPokemonData(pokemonIndex);
  let pokemon = {
    name: pokemonData["species"]["name"],
    image: pokemonData["sprites"]["front_shiny"],
    types: pokemonData["types"],
  };
  pokemonArray.push(pokemon);
  let mainContentContainer = document.getElementById("mainContentPokedex");
  mainContentContainer.innerHTML += createPokemonCard(pokemon.name, pokemon.image, pokemon.types, pokemonIndex);
}

// Funktion zum Abrufen von Pokémon-Daten von der API
async function fetchPokemonData(pokemonId) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  let response = await fetch(url);
  console.log('fetch', response);
  return await response.json();
}

// Funktion zum Generieren des HTML-Codes für die Pokémon-Karten
function createPokemonCard(pokemonName, pokemonImage, types, pokemonIndex) {
  let typesHtml = generatePokemonCardTypesHtml(types);
  let typesJsonString = JSON.stringify(types);
  // Map, die die Farben für jeden Pokémon-Typ definiert
  const colorMap = {
    normal: "grey",
    fire: "red",
    water: "blue",
    electric: "yellow",
    grass: "green",
    ice: "lightblue",
    fighting: "red",
    poison: "purple",
    ground: "brown",
    flying: "skyblue",
    psychic: "pink",
    bug: "green",
    rock: "grey",
    ghost: "purple",
    dragon: "lightblue",
    fairy: "pink",
    dark: "black",
  };

  // Festlegen der Farbe basierend auf dem ersten Pokémon-Typ
  let cardColor = colorMap[types[0]["type"]["name"]] || "";
  return /*html*/ `
  <div onclick="openSelectedCard()" id="pokemonCard${pokemonIndex}" class="pokemon-card ${cardColor}">
      <div class="pokemon-card-headline-name">
          <h1 class="pokemon-card-headline">${pokemonName}</h1>
      </div>
      <div class="pokemon-card-main-content-wrapper">
          <div class="pokemon-card-types-container">
              ${typesHtml}
          </div>
          <div class="pokemon-card-image-container">
              <img class="pokemon-card-image" src="${pokemonImage}" alt="">
          </div>
      </div>
  </div>`;
}

// Funktion zum Generieren des HTML-Codes für die Pokémon-Typen
function generatePokemonCardTypesHtml(types) {
  let typesHtml = "";
  for (let i = 0; i < types.length; i++) {
    let type = types[i]["type"]["name"];
    typesHtml += /*html*/ `
          <div class="pokemon-card-type"><b>${type}</b></div>
      `;
  }
  return typesHtml;
}

function openSelectedCard() {
  let selectedCardContainer = document.getElementById('selectedCardContainer');
}

// Funktion zum Laden weiterer Pokémon beim Klicken auf den Button
async function loadMorePokemon() {
  const newStart = end + 1;
  let newEnd = end + 30; 
  if (newEnd > 898) {
    newEnd = 898;
  }
  for (let i = newStart; i <= newEnd; i++) {
    // Füge die Pokémon-Karte hinzu, nachdem die Daten von der API abgerufen wurden
    await addPokemonCard(i);
  }
  // await loadPokemon(newStart, newEnd);
  start = newStart;
  end = newEnd;
}
