// Globale Variablen für den Start- und Endindex der geladenen Pokémon
let start = 1;
let end = 30;
let pokemonArray = [];
let currentChart;

  // Map, die die Farben für jeden Pokémon-Typ definiert
  let colorMap = {
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
  console.log('lol', pokemonData);
  loadPokemonDataToPokemonArray(pokemonData);

  let mainContentContainer = document.getElementById("mainContentPokedex");
  mainContentContainer.innerHTML += createPokemonCard(pokemonIndex);
}

function loadPokemonDataToPokemonArray(pokemonData) {
  let pokemon = {
    name: pokemonData["species"]["name"],
    image: pokemonData["sprites"]["front_shiny"],
    types: pokemonData["types"],
    abilities: pokemonData['abilities'],
    weight: pokemonData['weight'],
    stats: pokemonData['stats'],
  };
  pokemonArray.push(pokemon);
}

// Funktion zum Abrufen von Pokémon-Daten von der API
async function fetchPokemonData(pokemonId) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;
  let response = await fetch(url);
  return await response.json();
}

// Funktion zum Generieren des HTML-Codes für die Pokémon-Karten
function createPokemonCard(pokemonIndex) {

  let pokemonName = pokemonArray[pokemonIndex - 1]['name'];

  let pokemonImage = pokemonArray[pokemonIndex - 1]['image'];
  let pokemonTypes = pokemonArray[pokemonIndex - 1]['types'];
  
  let typesHtml = generatePokemonCardTypesHtml(pokemonTypes);

  // Festlegen der Farbe basierend auf dem ersten Pokémon-Typ
  let cardColor = colorMap[pokemonTypes[0]["type"]["name"]] || "";

  return /*html*/ `
  <div onclick="openSelectedCard(${pokemonIndex})" id="pokemonCard${pokemonIndex}" class="pokemon-card ${cardColor}">
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

function openSelectedCard(pokemonIndex) {
  
  let selectedPokemonName = pokemonArray[pokemonIndex - 1]['name']; // -1 Da Arrays bei 0 beginnen
  let selectedPokemonImage = pokemonArray[pokemonIndex -1]['image']; // -1 Da Arrays bei 0 beginnen
  let selectedPokemonTypes = pokemonArray[pokemonIndex -1]['types']; // -1 Da Arrays bei 0 beginnen
  
  let SelectedPokemonCardColor = colorMap[selectedPokemonTypes[0]["type"]["name"]] || "";
  let typesHtml = generatePokemonCardTypesHtml(selectedPokemonTypes);


  let backgroundCloseDiv = document.getElementById('closeSelectedCardBackgroundDiv');
  backgroundCloseDiv.classList.remove('d-none');
  let selectedCardContainer = document.getElementById('selectedCardContainer');
  selectedCardContainer.classList.remove('d-none');



  selectedCardContainer.innerHTML = ``;
  selectedCardContainer.innerHTML = /*html*/`
  <div class="selected-card ${SelectedPokemonCardColor}">
    <div class="selected-card-close-button">
        <img onclick="closeSelectedCard()" class="normal-button" src="/img/close-button.png" alt="">
    </div>
    <div class="selected-card-headline">
        <h1>${selectedPokemonName}</h1>
    </div>
    <div class="selected-card-main">
      <img onclick="openSelectedCard(${pokemonIndex -1})" class="normal-button" src="/img/back-button.png" alt="">
      <div class="selected-card-main-content-wrapper">
        <div class="selected-card-main-content">
          <div class="selected-card-main-image">
            <img src="${selectedPokemonImage}" alt="">
          </div>
          <div class="selected-card-main-types">
            ${typesHtml}
          </div>
        </div>
        <div class="selected-card-main-chart">
        <div class="selected-card-chart-wrapper">
  <canvas class="selected-card-chart" id="myChart" width="500" height="400"></canvas>
</div>
        </div>
    </div>
    <img onclick="openSelectedCard(${pokemonIndex +1})"  class="normal-button" src="/img/forward-button.png" alt="">
  </div>
  `;  

let body = document.getElementById('body');
  body.style.overflow = 'hidden';

  
const ctx = document.getElementById('myChart');
const baseStat1 = pokemonArray[pokemonIndex]['stats'][0]['base_stat'];
console.log(pokemonArray[29]['stats'][0]['base_stat']);
const baseStat2 = pokemonArray[pokemonIndex]['stats'][1]['base_stat'];
const baseStat3 = pokemonArray[pokemonIndex]['stats'][2]['base_stat'];
const baseStat4 = pokemonArray[pokemonIndex]['stats'][3]['base_stat'];
const baseStat5 = pokemonArray[pokemonIndex]['stats'][4]['base_stat'];
const baseStat6 = pokemonArray[pokemonIndex]['stats'][5]['base_stat'];
const baseStatsNames1 = pokemonArray[pokemonIndex]['stats'][0]['stat']['name'];
const baseStatsNames2 = pokemonArray[pokemonIndex]['stats'][1]['stat']['name'];
const baseStatsNames3 = pokemonArray[pokemonIndex]['stats'][2]['stat']['name'];
const baseStatsNames4 = pokemonArray[pokemonIndex]['stats'][3]['stat']['name'];
const baseStatsNames5 = pokemonArray[pokemonIndex]['stats'][4]['stat']['name'];
const baseStatsNames6 = pokemonArray[pokemonIndex]['stats'][5]['stat']['name'];

currentChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: [baseStatsNames1, baseStatsNames2, baseStatsNames3, baseStatsNames4, baseStatsNames5, baseStatsNames6],
      datasets: [{
          label: 'stats',
          backgroundColor: "rgba(159,170,174,0.8)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(232,105,90,0.8)",
          hoverBorderColor: "orange",
          scaleStepWidth: 1,
          data: [baseStat1, baseStat2, baseStat3, baseStat4, baseStat5, baseStat6],
          backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
          ],
          borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
          ],
          borderWidth: 1
      }]
  },

  options: {
      scales: {
          x: {
              ticks: {
                  color: 'white', // Schriftfarbe der x-Achsenbeschriftungen auf Weiß setzen
                  font: {
                      size: 20 // Schriftgröße der x-Achsenbeschriftungen auf 20 Pixel setzen
                  }
              }
          },
          y: {
              ticks: {
                  color: 'white', // Schriftfarbe der y-Achsenbeschriftungen auf Weiß setzen
                  font: {
                      size: 30 // Schriftgröße der y-Achsenbeschriftungen auf 30 Pixel setzen
                  }
              },
              beginAtZero: true
          }
      },
      plugins: {
          legend: {
              labels: {
                  font: {
                      size: 30, // Schriftgröße der Legendenlabels auf 30 Pixel setzen
                      color: 'white' // Schriftfarbe der Legendenlabels auf Weiß setzen
                  },
                  color: 'white' // Schriftfarbe des Labels "stats" auf Weiß setzen
              }
          }
      }
  }
});

}

function closeSelectedCard() {
  let selectedCardContainer = document.getElementById('selectedCardContainer');
  selectedCardContainer.classList.add('d-none');
  
  let backgroundCloseDiv = document.getElementById('closeSelectedCardBackgroundDiv');
  backgroundCloseDiv.classList.add('d-none');

  let body = document.getElementById('body');
  body.style.overflow = 'auto';

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


