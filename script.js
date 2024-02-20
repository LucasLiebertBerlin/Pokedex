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
  function createPokemonCard(pokemonName, pokemonImage, types, pokemonIndex) {
    let typesHtml = generatePokemonCardTypesHtml(types);

    // Map, die die Farben für jeden Pokémon-Typ definiert
    const colorMap = {
        'normal': 'grey',
        'fire': 'red',
        'water': 'blue',
        'electric': 'yellow',
        'grass': 'green',
        'ice': 'lightblue',
        'fighting': 'red',
        'poison': 'purple',
        'ground': 'brown',
        'flying': 'skyblue',
        'psychic': 'pink',
        'bug': 'green',
        'rock': 'grey',
        'ghost': 'purple',
        'dragon': 'lightblue'
    };

    // Festlegen der Farbe basierend auf dem ersten Pokémon-Typ
    let cardColor = colorMap[types[0]["type"]["name"]] || '';

    return /*html*/ `
      <div id="pokemonCard${pokemonIndex}" class="pokemon-card ${cardColor}">
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

//   }
//   function generateCardColorFromType(types, pokemonIndex) {
//     const pokemonCard = document.getElementById(`pokemonCard${pokemonIndex}`);
    
//     // Überprüfen, ob das Element gefunden wurde
//     if (pokemonCard) {
//         const colorMap = {
//             'normal': 'grey',
//             'fire': 'red',
//             'water': 'blue',
//             'electric': 'yellow',
//             'grass': 'green',
//             'ice': 'lightblue',
//             'fighting': 'red',
//             'poison': 'purple',
//             'ground': 'brown',
//             'flying': 'skyblue',
//             'psychic': 'pink',
//             'bug': 'green',
//             'rock': 'grey',
//             'ghost': 'purple',
//             'dragon': 'lightblue'
//         };

//         const colorCount = {};

//         // Bestimme die Häufigkeit jeder Farbe
//         types.forEach(type => {
//             const typeName = type.type.name;
//             if (colorMap[typeName]) {
//                 colorCount[colorMap[typeName]] = (colorCount[colorMap[typeName]] || 0) + 1;
//             }
//         });

//         // Wähle die dominante Farbe aus
//         let dominantColor = '';
//         let maxCount = 0;
//         for (const color in colorCount) {
//             if (colorCount[color] > maxCount) {
//                 dominantColor = color;
//                 maxCount = colorCount[color];
//             }
//         }

//         // Füge die CSS-Klasse für die dominante Farbe hinzu
//         pokemonCard.classList.add(dominantColor);

//         // Rückgabe der dominanten Farbe
//         return dominantColor;
//     }

//     // Wenn das Element nicht gefunden wurde, gib null zurück
//     return null;
// }



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
  
  // Funktion zum Hinzufügen einer Pokémon-Karte zum Hauptcontainer
  async function addPokemonCard(pokemonIndex) {
    let pokemonData = await fetchPokemonData(pokemonIndex);
    console.log(pokemonData);
    let pokemonName = pokemonData["species"]["name"];
    let pokemonImage = pokemonData["sprites"]["front_shiny"];
    let types = pokemonData["types"];
    let mainContentContainer = document.getElementById("mainContentPokedex");
    mainContentContainer.innerHTML += createPokemonCard(pokemonName, pokemonImage, types, pokemonIndex);
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
