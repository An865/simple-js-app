//iife function which returns object pokemonRepository
let pokemonRepository = (() => {

  //pokemonList array will hold all pokemon from pokemon API
  let pokemonList = [];
  //URL of pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //Container for modal that will display Pokemon information
  let modalContainer = document.getElementById('modal-container');
  //variables to store the initial X and Y positions

 
  //listen for left and right swipe motions on mobile devices
    let modal = document.getElementById('exampleModal');
    let isSwiping = false;
    let swipeData = [];
    modal.addEventListener('pointerdown', handleStart);
    modal.addEventListener('pointermove', handleMove);
    modal.addEventListener('pointerup', handleEnd);
    

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
            alert('Incorrect JSON keys');
          }
      } else {
      alert('All items in pokemonRepository must be objects!');
      }
  }

  //capitalize first letter of string
  function capitalize(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  //add pokemon from array into the HTML list //aka addListItem
  function htmlList(pokemon){
    //unordered list of pokemon and list item
    let list = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'col-md-4', 'col-12');
    //create button, give it pokemon's name, and add class to style
    let listButton = document.createElement('button');
    listButton.innerText = capitalize(pokemon.name);
    listButton.classList.add('btn','btn-primary');
    listButton.setAttribute('type', 'button');
    listButton.setAttribute('data-bs-toggle', 'modal');
    listButton.setAttribute('data-bs-target', '#exampleModal');
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

          //Get element with class 'modal content' to append height, type, image elements
        let modalBody = document.querySelector('.modal-body');

        //clear modalBody 
        modalBody.innerHTML = '';

        //display pokemon name
        document.querySelector('.modal-title').innerHTML = capitalize(pokemon.name);

        //element to display pokemon height
        let heightElement = document.createElement('p');
        heightElement.innerText = `Pokemon Height: ${pokemon.height} meters`;

        //element to display pokemon height
        let weightElement = document.createElement('p');
        weightElement.innerText = `Pokemon Weight: ${pokemon.weight} hectograms`;

        //element to display list of pokemon types
        let typeContainer = document.createElement('ul');
        typeContainer.classList.add('poketype')
        typeContainer.innerText = 'Pokemon Type:';

          pokemon.types.forEach((item) => {
              let typeData = item.type.name;
              let newListItem = document.createElement('li');
              typeContainer.appendChild(newListItem);
              newListItem.innerText += capitalize(typeData);
          });

        //element to display pokemon image
        let imgContainer = document.createElement('img');
        imgContainer.setAttribute('src', pokemon.imageUrl);

        //add close button, pokemon title, height, image to modal
        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(typeContainer);
        modalBody.appendChild(imgContainer);
        swipeData.push(pokemon);
      });
  }
    
  //handle start of touch
  function handleStart(e){
    isSwiping = true;
    let initialX = e.pageX;
    let initialY = e.pageY;
    swipeData.push(initialX);
    swipeData.push(initialY);
  }

  //handle touch movement
  function handleMove(e){
    //To prevent changing modal content unless swiping
    if(!isSwiping){
      return;
    } 
    
    // current x and y coordinates
    let currentX = e.pageX;
    let currentY = e.pageY;

    //difference between current and initial x/y coordinates
    let diffX = currentX - swipeData[1];
    let diffY = currentY - swipeData[2];
  
    //index of current pokemon
    let currPokeIndex = pokemonList.indexOf(swipeData[0]); 

    //Horizontal movement
    if(Math.abs(diffX) > Math.abs(diffY)){
      if (diffX > 0) {
        // swiped left
        console.log("swiped left");
        showDetails(pokemonList[currPokeIndex - 1]);
      } else {
        // swiped right
        console.log("swiped right");
        showDetails(pokemonList[currPokeIndex + 1]);
      } 
    }
  }

  //handle end of touch
  function handleEnd(){
    isSwiping = false;
  }


//Load list of pokemon from API
    function loadApiList() {
      return fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                json.results.forEach(item => {
                    let pokemon = {
                      name: item.name,
                      detailsUrl: item.url,
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
             pokemon.weight = details.weight;
             pokemon.types = details.types;
          }) //end function, end then
          .catch(err => console.log(err))
}

//filter pokemonList by searched name and produce new html buttons based on filter
    function pokemonLookup(searchValue){
      let list = document.querySelector('.list-group');
      list.innerHTML = '';
      let searched = pokemonList.filter(pokemon => {
        let pokemonNames = pokemon.name;
        if(pokemonNames.includes(searchValue))
        htmlList(pokemon);
      });
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

//event listener for search input
searchInput.addEventListener("input", () => {
  pokemonRepository.pokemonLookup(searchInput.value);
});