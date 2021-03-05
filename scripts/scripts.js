//iife function which returns object pokemonRepository
let pokemonRepository = (() => {

  //pokemonList array will hold all pokemon from pokemon API
  let pokemonList = [];
  //URL of pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//get list of all pokemon in pokemonList array
    function getPokemonArray(){
      return pokemonList;
    }

//add new pokemon to the pokemonList array
    function addToPokemonArray(pokemon){
      //ensure only objects are added to pokemonRepository
        if(typeof(pokemon) == 'object'){
            //keyVal is array that holds keys of pokemon object
            let keyVal = Object.keys(pokemon);
            //ensure keyVal array includes keys 'name' and 'detailsUrl'
            if (keyVal.includes('name')&& keyVal.includes('detailsUrl')){
                //add pokemon object to pokemonList array
                pokemonList.push(pokemon);
            } else {
              alert('Incorrect JSON keys')
            }
        } else {
        alert('All items in pokemonRepository must be objects!');
        }
    }

//add pokemon from array into the HTML list //aka addListItem
    function htmlList(pokemon){
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
    function showDetails(pokemon) {
      loadApiDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

//Load list of pokemon from API
    function loadApiList() {
      return fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(item => {
                    let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                    };
                  //pass pokemon object to add() to include in pokemonList array
                  addToPokemonArray(pokemon);
                });
            })
      .catch(err => console.error(err))
    }

//function to get details of each pokemon from API
function loadApiDetails(pokemon){
    //url associated with pokemon
    let url = pokemon.detailsUrl;
    //return completed promise of fetched data from url
    return fetch(url)
          //promised response to json data promise
          .then(response => response.json())
          //use promised details data from json to assign pokemon properties
          .then(details => {
             pokemon.imageUrl = details.sprites.front_default;
             pokemon.height = details.height;
             pokemon.types = details.types;
          }) //end function, end then
          .catch(err => console.log(err))
}

//filter pokemonList by target name
    function pokemonLookup(target){
      return pokemonList.filter(pokemon => pokemon.name == target);
    }

    return {
      loadApiList: loadApiList,
      loadApiDetails: loadApiDetails,
      addToPokemonArray: addToPokemonArray,
      getPokemonArray: getPokemonArray,
      pokemonLookup: pokemonLookup,
      htmlList: htmlList,

    }
})();

//call loadApiList to load pokemon list from API
pokemonRepository.loadApiList()
  .then(() => {
      //when promise fullfilled get array of pokemon.  For each array item add it to page's HTML
      pokemonRepository.getPokemonArray().forEach(pokemon => pokemonRepository.htmlList(pokemon));
  });

/* // return array of pokemon with the name of 'Pickachu'
Note: currently this is commented out to keep console clear for showDetails() */
//console.log(pokemonRepository.pokemonLookup('Pikachu'));
