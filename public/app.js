const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
}
const requestComplete = function(){
  if(this.status !== 200)return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
  handleSelected(beers);
}

const populateList = function(beers){
  let selectTag = document.getElementById('beerDropdown');

  beers.forEach(function(beer, index){
    let option = document.createElement('option');
    option.className = 'select-result'
    option.value = index;
    option.innerText = beer.name;
    selectTag.appendChild(option);
  });

//   var storedBeer = localStorage.getItem('selected_beer');
//   var beerDetails = document.getElementById('beerDetails');
//   if(storedBeer){
//   beerToDisplay = JSON.parse(storedBeer);
//   console.log(storedBeer);
//   var pTag = document.createElement('p');
//   pTag.innerText = beerToDisplay.name;
//   beerDetails.appendChild(pTag);
// }
};


const handleSelected = function(beers){
  let selectTag = document.getElementById('beerDropdown');
  selectTag.addEventListener('change', function(){
    var beer = beers[this.value];
    console.log(beer);
    showBeerDetails(beer);
  })
};

const showBeerDetails = function(beer){
  var beerDetails = document.getElementById('beerDetails');
  var pTag = document.createElement('p');
  console.log(beer);
  pTag.innerText = beer.name;
  beerDetails.appendChild(pTag);


  var imgHolder = document.createElement('img');
  imgHolder.src = beer.image_url;
  beerDetails.appendChild(imgHolder);

  var abv = document.createElement('p');
  abv.innerText = beer.abv;
  beerDetails.appendChild(abv);

  var description = document.createElement('p');
  description.innerText = beer.description;
  beerDetails.appendChild(description);

  var jsonString = JSON.stringify(beer);
  localStorage.setItem('selected_beer', jsonString);
};

var app = function(){
  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
