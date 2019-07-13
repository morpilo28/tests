var c = document.getElementById('c');

var url = '';
function reqListener() {
    var arrayOfCountries = JSON.parse(this.responseText)
    console.log(arrayOfCountries);
    countries.innerHTML = ''; //clear results before adding new
    
    for(let i=0; i < arrayOfCountries.length; i++) {
        let htmlStr = '';
        htmlStr += "<div class='row'>";
        htmlStr += "<div class='col-6'>";
        htmlStr += "name: " + arrayOfCountries[i].name+ "<br>";
        htmlStr += "topLevelDomain: " + arrayOfCountries[i].topLevelDomain + "<br>";
        htmlStr += "capital: " + arrayOfCountries[i].capital + "<br>";
        htmlStr += "currencies:" + JSON.stringify(arrayOfCountries[i].currencies);
        htmlStr += "</div>";
        htmlStr += "<div class='col-6'>";
        htmlStr += "<img class='img-fluid' src='" + arrayOfCountries[i].flag + "'>";
        htmlStr += "</div></div>";
        countries.innerHTML += htmlStr;
       
        // arrayOfCountries[i].topLevelDomain; // array
     
        // arrayOfCountries[i].currencies // array of objects
         // string of URL

       
    }
   



   
}
function fetchCountries() {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
}

all.addEventListener('click', function () {
    // url = 'https://restcountries.eu/rest/v2/all';
    url = 'data.json';
    fetchCountries();
})


byname.addEventListener('click', function () {
    const name = c.value;
    url = 'https://restcountries.eu/rest/v2/name/' + name;
    fetchCountries();
})
