let pokemonRepository = (function(){

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

//get list of all pokemon in pokemonList array
    function getAll(){
      return pokemonList;
    }

//add new pokemon to the pokemonList array
    function add(item){
      //ensure only objects are added to pokemonRepository
        if(typeof(item) == 'object'){
          let keyVal = Object.keys(item);
          //ensure new pokemon has name, height, and type properties
          if(keyVal.includes('name') && keyVal.includes('height') && keyVal.includes('type'))
            pokemonList.push(item);
      } else {
        alert('All items in pokemonRepository must be objects!');
      }
    }

//filter pokemonList by target name
    function checkName(target){
      return pokemonList.filter(pokemon => pokemon.name == target);
    }

    return {
      getAll: getAll,
      add: add,
      checkName: checkName,
    }
})();

//function to display pokemon on HTML page including name, height, and comment on height
function display(pokemon){
  document.write(`<p id='pokemon'> ${pokemon.name} height: ${pokemon.height}`);
  if(pokemon.height > 1.0){
    document.write(' - that\'s pretty tall!' + '</p>')
  }
}

//call display on each element of the pokemon in the pokemonList array
pokemonRepository.getAll().forEach(display);

//return array of pokemon with the name of 'Pickachu'
console.log(pokemonRepository.checkName('Pikachu'));
