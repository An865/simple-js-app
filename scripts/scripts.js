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
    function addPokemon(item){
      //ensure only objects are added to pokemonRepository
        if(typeof(item) == 'object'){
          let keyVal = Object.keys(item);
          //ensure new pokemon has name, height, and type properties
          if(keyVal.includes('name') && keyVal.includes('height') && keyVal.includes('type'))
            {pokemonList.push(item)} else {
              alert('Not all properties for the pokemon were included');
            };
      } else {
        alert('All items in pokemonRepository must be objects!');
      }
    }

//filter pokemonList by target name
    function checkName(target){
      return pokemonList.filter(pokemon => pokemon.name == target);
    }

    function addListItem(pokemon){
      //unordered list of pokemon and list item
       let list = document.querySelector('.pokemon-list');
       let listItem = document.createElement('li');
       //create button, give it pokemon's name, and add class to style
       let listButton = document.createElement('button');
       listButton.innerText = pokemon.name;
       listButton.classList.add('button-style');
       //append button to list item.  append list item to unordered list
       listItem.appendChild(listButton);
       list.appendChild(listItem);
       //call function to add event listener on listButton and pass button and pokemon object
       addListener(listButton, showDetails, pokemon);
    }

//function to add event listener to a given element
    function addListener(element, method, object){
      element.addEventListener('click', () => method(object));
    }

//function to show pokemon details (currently logged to console)
    function showDetails(pokemon){
      console.log(pokemon)
    }

    return {
      getAll: getAll,
      addPokemon: addPokemon,
      checkName: checkName,
      addListItem: addListItem
    }
})();

//call displayPokemon on each item of pokemonList array to display in HTML
pokemonRepository.getAll().forEach( pokemon => pokemonRepository.addListItem(pokemon));



/* // return array of pokemon with the name of 'Pickachu'
Note: currently this is commented out to keep console clear for showDetails() */
//console.log(pokemonRepository.checkName('Pikachu'));
