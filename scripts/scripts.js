let pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    type: ['grass', 'poison']
  },
  {
    name: 'Pikachu',
    height: 0.4,
    type: ['electric']
  },
  {
    name: 'Fearow',
    height: 1.2,
    type: ['flying','normal']
  },
  {
    name: "Paras",
    height: 0.3,
    type: ['grass', 'bug']
  },
  {
    name: "Poliwrath",
    height: 1.3,
    type: ['water', 'fighting']
  },
  {
    name: "Graveler",
    height: 1.0,
    type: ['rock', 'ground']
  }
];

function show(pokemon){
  document.write(`<p id='pokemon'> ${pokemon.name} height: ${pokemon.height}`);
  if(pokemon.height > 1.0){
    document.write(' - that\'s pretty tall!' + '</p>')
  }
}

pokemonList.forEach(show);
