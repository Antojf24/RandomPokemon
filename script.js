const poke_container = document.getElementById('poke_container');

const colors = {
	fire: '#ff0000',
	grass: '#28cd18',
	electric: '#f6ff00',
	water: '#0ec7f7',
	ground: '#dae26f',
	rock: '#beaa6d',
	fairy: '#fbc9ff',
	poison: '#8d14ae',
	bug: '#9acd32',
	dragon: '#393aa8',
	psychic: '#fc00ff',
	flying: '#6cfeff',
	fighting: '#bf3d20',
	normal: '#9d9d9d'
};
const main_types = Object.keys(colors);

const getPokemon = async id => {
    id = Math.floor(Math.random() * 151) + 1;
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemonJS = await res.json();
	createPokemonCard(pokemonJS);
};

function createPokemonCard(pokemonJS) {
	const pokemon = document.createElement('div');
	pokemon.classList.add('pokemon');
    pokemon.id = "pokemon";

	const poke_types = pokemonJS.types.map(type => type.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemonJS.name[0].toUpperCase() + pokemonJS.name.slice(1);
	const color = colors[type];
	
	pokemon.style.backgroundColor = color;

	const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonJS.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemonJS.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

	pokemon.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemon);
}

getPokemon();

poke_container.addEventListener("click", function(){
    let pokemon = document.getElementById("pokemon");
    poke_container.removeChild(pokemon);
    getPokemon();
});