// Globale Variablen für den Start- und Endindex der geladenen Pokémon
let start = 1;
let end = 30;

// Funktion zum Initialisieren der Seite
async function init() {
    await loadInitialPokemon(start, end);
}

  // Funktion zum Laden der ersten Pokémon
  async function loadInitialPokemon(startIndex, endIndex) {
    await loadPokemon(startIndex, endIndex);
  }
  
  // Funktion zum Laden von Pokémon basierend auf dem Start- und Endindex
  async function loadPokemon(startIndex, endIndex) {
    for (let i = startIndex; i <= endIndex; i++) {
      // Füge die Pokémon-Karte hinzu, nachdem die Daten von der API abgerufen wurden
      await addPokemonCard(i);
    }
  }
  
  // Funktion zum Abrufen von Pokémon-Daten von der API
  async function fetchPokemonData(pokemonId) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
    let response = await fetch(url);
    return await response.json();
  }
  
  // Funktion zum Generieren des HTML-Codes für eine Pokémon-Karte
  function createPokemonCard(pokemonName, pokemonImage, types) {
    let typesHtml = generatePokemonCardTypesHtml(types);
    return /*html*/ `
      <div class="pokemon-card">
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
          <div><b>${type}</b></div>
      `;
    }
    return typesHtml;
  }
  
  // Funktion zum Hinzufügen einer Pokémon-Karte zum Hauptcontainer
  async function addPokemonCard(pokemonIndex) {
    let pokemonData = await fetchPokemonData(pokemonIndex);
    let pokemonName = pokemonData["species"]["name"];
    let pokemonImage = pokemonData["sprites"]["front_shiny"];
    let types = pokemonData["types"];
    let mainContentContainer = document.getElementById("mainContentPokedex");
    mainContentContainer.innerHTML += createPokemonCard(pokemonName, pokemonImage, types);
  }
  
// Funktion zum Laden weiterer Pokémon beim Klicken auf den Button
async function loadMorePokemon() {
    let newStart = end + 1;
    let newEnd = end + 30;
    if (newEnd > 898) {
        newEnd = 898;
    }

    await loadPokemon(newStart, newEnd);
    start = newStart; // Aktualisiere den Startindex
    end = newEnd; // Aktualisiere den Endindex
}
