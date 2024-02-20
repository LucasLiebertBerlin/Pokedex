// Funktion, die beim Initialisieren der Seite aufgerufen wird
async function init() {
  // Lade die ersten 30 Pokémon
  await loadInitialPokemon();
}

// Startindex für die geladenen Pokémon
let start = 1;
// Endindex für die geladenen Pokémon
let end = 30;

// Funktion zum Laden der ersten 30 Pokémon
async function loadInitialPokemon() {
  await loadPokemon(start, end);
}

// Funktion zum Laden von Pokémon basierend auf dem Start- und Endindex
async function loadPokemon(start, end) {
  for (let i = start; i <= end; i++) {
    // Füge die Pokémon-Karte hinzu, nachdem die Daten von der API abgerufen wurden
    addPokemonCard(await fetchPokemon(i));
  }
}

// Funktion zum Abrufen von Pokémon-Daten von der API
async function fetchPokemon(pokemonId) {
  // URL zur API-Anfrage für das Pokémon
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  // API-Anfrage und Rückgabe der JSON-Daten
  let response = await fetch(url);
  return await response.json();
}

// Funktion zum Generieren des HTML-Codes für eine Pokémon-Karte
function generatePokemonCardHtml(pokemonName, pokemonImage) {
  // HTML-Code für die Pokémon-Karte unter Verwendung der übergebenen Daten
  return /*html*/ `
      <div class="pokemon-card">
          <div class="pokemon-card-headline-name">
              <h1 class="pokemon-card-headline">${pokemonName}</h1>
          </div>
          <div class="pokemon-card-main-content-wrapper">
              <div class="pokemon-card-types-container">
              </div>
              <div class="pokemon-card-image-container">
                  <img class="pokemon-card-image" src="${pokemonImage}" alt="">
              </div>
          </div>
      </div>`;
}

// Funktion zum Hinzufügen einer Pokémon-Karte zum Hauptcontainer
function addPokemonCard(pokemonData) {
  // Extrahiere den Namen und das Bild des Pokémon aus den Daten
  let pokemonName = pokemonData["species"]["name"];
  let pokemonImage = pokemonData["sprites"]["front_shiny"];
  // Hauptcontainer für die Anzeige der Pokémon-Karten abrufen
  let mainContentContainer = document.getElementById("mainContentPokedex");
  // HTML-Code für die Pokémon-Karte generieren und dem Hauptcontainer hinzufügen
  mainContentContainer.innerHTML += generatePokemonCardHtml(
    pokemonName,
    pokemonImage
  );
}

// Funktion zum Laden weiterer Pokémon beim Klicken auf den Button
async function loadMorePokemon() {
  // Neuer Startindex für die nächsten 30 Pokémon
  let newStart = end + 1;
  // Neuer Endindex für die nächsten 30 Pokémon
  let newEnd = end + 30;
  // Überprüfen, ob der neue Endindex größer als die Gesamtanzahl der Pokémon ist
  if (newEnd > 898) {
    // Setze den Endindex auf 898, um alle verbleibenden Pokémon zu laden
    newEnd = 898;
  }

  // Lade die nächsten Pokémon basierend auf den neuen Start- und Endindizes
  await loadPokemon(newStart, newEnd);
  // Aktualisiere den Startindex für zukünftige Ladevorgänge
  start = newStart;
  // Aktualisiere den Endindex für zukünftige Ladevorgänge
  end = newEnd;
}
