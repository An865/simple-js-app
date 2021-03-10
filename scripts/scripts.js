//iife function which returns object pokemonRepository
let pokemonRepository = (() => {

  //pokemonList array will hold all pokemon from pokemon API
  let pokemonList = [];
  //URL of pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //Container for modal that will display Pokemon information
  let modalContainer = document.getElementById('modal-container');


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

//function to show pokemon details
    function showDetails(pokemon) {
        loadApiDetails(pokemon)
          .then(() => {
            //when promise is returned with details data from API...

              //clear modal container of any previous content
              modalContainer.innerHTML = '';
              // create modal within modal container
              let modal = document.createElement('div');
              //add class to modal for styling
              modal.classList.add('modal');

              // button to close modal
              let closeButtonElement = document.createElement('button');
               closeButtonElement.classList.add('modal-close');
               closeButtonElement.innerText = 'Close';
               closeButtonElement.addEventListener('click', hideModal);

               //close modal via esc key
               window.addEventListener('keydown', (e)=>{
                 //if key is 'Escape' and modal is current visible call hideModal() to close
                   if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
                     hideModal();
                   }
               });

              //close modal via clicking outside modal container
               modalContainer.addEventListener('click', (e) => {
                 //close if user clicks only on modal container and not modal itself
                 let target = e.target;
                 if(target === modalContainer){
                   hideModal();
                 }
               });

              //display pokemon name
               let titleElement = document.createElement('h1');
               titleElement.innerText = pokemon.name;

              //display pokemon height
               let heightElement = document.createElement('p');
               heightElement.innerText = `'Pokemon Height: ${pokemon.height} meters`;

              //display list of pokemon types
               let typeContainer = document.createElement('ol');
               typeContainer.innerText = 'Pokemon Type';
               //let typeElement = document.createElement('li');

               pokemon.types.forEach((item) => {
                   let typeData = item.type.name;
                   let newListItem = document.createElement('li');
                   typeContainer.appendChild(newListItem);
                   newListItem.innerText += typeData;
               });


              //display pokemon image
              let imgContainer = document.createElement('img');
              imgContainer.setAttribute('src', pokemon.imageUrl);


              //add close button, pokemon title, height, image to modal
              modal.appendChild(closeButtonElement);
              modal.appendChild(titleElement);
              modal.appendChild(heightElement);
              modal.appendChild(typeContainer);
              modal.appendChild(imgContainer);
              //add modal to modal container
              modalContainer.appendChild(modal);

              //make modal visible
              modalContainer.classList.add('is-visible');
          });
    }

function hideModal(){
      modalContainer.classList.remove('is-visible');
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
