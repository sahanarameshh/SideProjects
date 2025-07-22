const searchBar = document.getElementById('search-bar');
const pokeInfo = document.getElementById('poke-info');

async function fetchPokemon(poke) {
    try {
        pokeInfo.textContent = 'Loading...';
        const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
        const response = await fetch(baseUrl + poke);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        function capitalizeFirstLetter(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        const data = await response.json();
        const pokemonName = capitalizeFirstLetter(data.name);
        const pokemonID = data.id;
        const pokemonSprite = data.sprites.front_default;
        const pokemonTypes = capitalizeFirstLetter(data.types.map(t => t.type.name).join(', '));
        const pokemonAbilities = capitalizeFirstLetter(data.abilities.map(a => a.ability.name).join(', '));

        pokeInfo.innerHTML = `
            <h2>${pokemonName} (ID: ${pokemonID})</h2>
            <img src="${pokemonSprite}" alt="${pokemonName}" />
            <p><strong>Type:</strong> ${pokemonTypes}</p>
            <p><strong>Abilities:</strong> ${pokemonAbilities}</p>
        `;
    } catch (error) {
        pokeInfo.textContent = 'Error fetching Pokemon. Check that the name/ID is typed correctly';
    }
}

searchBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const poke = searchBar.value.trim();
    fetchPokemon(poke);
  }
});