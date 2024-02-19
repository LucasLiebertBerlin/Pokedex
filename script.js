// Funktion, die beim Initialisieren der Seite aufgerufen wird
async function init() {
    loadPokemon(start, end); // Lade die ersten 30 Pokémon
}

// Startindex für die geladenen Pokémon
let start = 1;
// Endindex für die geladenen Pokémon
let end = 30;

// Funktion zum Laden von Pokémon basierend auf dem Start- und Endindex
async function loadPokemon(start, end) {
    // Schleife durchläuft alle Pokémon im angegebenen Bereich
    for (let i = start; i <= end; i++) {
        // ID des aktuellen Pokémon
        let pokemonId = i;
        // URL zur API-Anfrage für das aktuelle Pokémon
        let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
        // API-Anfrage, um Informationen über das Pokémon zu erhalten
        let response = await fetch(url);
        // Antwort in JSON-Format umwandeln
        let responseAsJson = await response.json();
        // Name des Pokémon aus der Antwort abrufen
        let pokemonName = responseAsJson["species"]["name"];
        // Bild des Pokémon aus der Antwort abrufen
        let pokemonImage = responseAsJson['sprites']['front_shiny'];
        // Hauptcontainer für die Anzeige der Pokémon-Karten abrufen
        let mainContentContainer = document.getElementById("mainContentPokedex");

        // HTML-Code für die Pokémon-Karte erstellen und dem Hauptcontainer hinzufügen
        mainContentContainer.innerHTML += /*html*/ `
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
}

// Funktion zum Laden von weiteren Pokémon beim Klicken auf den Button
function loadMorePokemon() {
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
    loadPokemon(newStart, newEnd);
    // Aktualisiere den Startindex für zukünftige Ladevorgänge
    start = newStart;
    // Aktualisiere den Endindex für zukünftige Ladevorgänge
    end = newEnd;
}
