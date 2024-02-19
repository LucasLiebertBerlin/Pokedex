



async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon/1025';
    let response = await fetch(url);
    let responseAsJson = await response.json();

    console.log('loaded Pokemon', responseAsJson);
}