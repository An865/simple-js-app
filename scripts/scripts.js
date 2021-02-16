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

for (var i = 0; i < pokemonList.length; i++) {
  //prints pokemon name and height
  let name = pokemonList[i].name;
  let height = pokemonList[i].height;

  document.write(`<p id ="pokemon"> ${name} height: ${height} `);

  //comments on pokemon height
    if(height > 1.0){
      document.write(' - that\'s pretty tall') + '</p>';
    }

}
