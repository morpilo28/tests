var RecivedDataBox = document.getElementById('RecivedDataBox');
var url = "https://restcountries.eu/rest/v2/all";
//var url2 = "https://restcountries.eu/rest/v2/name/{name}";

var country = document.getElementById('country');


document.getElementById('onlyOneCountry').addEventListener('click', function (e) {
    e.preventDefault();
    var url2 = "https://restcountries.eu/rest/v2/name/" + country.value;
    var oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function () {
        var obj = JSON.parse(this.responseText);

        var div = document.createElement('div');
        div.id = 'div';
        div.innerHTML += "<u>" + country.value + "'s name: </u> <b>" + JSON.stringify(obj[0].name) + "</b> <br>";
        div.innerHTML += "<u>" + country.value + "'s top Level Domain: </u> <b>" + JSON.stringify(obj[0].topLevelDomain) + "</b> <br>";
        div.innerHTML += "<u>" + country.value + "'s capital: </u> <b>" + JSON.stringify(obj[0].capital) + "</b> <br>";
        div.innerHTML += "<u>" + country.value + "'s currencies: </u> <b>" + JSON.stringify(obj[0].currencies) + "</b> <br>";
        RecivedDataBox.appendChild(div);
        div.style.border = '1px solid black';

        var img = document.createElement('img');
        img.id = 'img';
        img.src = ' ' + obj[0].flag + '';
        div.appendChild(img);

    });
    oReq.open("GET", url2);
    oReq.send();

});

document.getElementById('allCountries').addEventListener('click', function (e) {
    e.preventDefault();
    var oReq = new XMLHttpRequest();

    oReq.addEventListener("load", function () {
        var obj = JSON.parse(this.responseText);
        for (let i = 0; i < obj.length; i++) {

            var div = document.createElement('div');
            div.id = 'div';
            div.innerHTML += "<u> Country's Name: </u> <b>" + JSON.stringify(obj[i].name) + "</b> <br>";
            div.innerHTML += "<u> Country's top Level Domain: </u> <b>" + JSON.stringify(obj[i].topLevelDomain) + "</b> <br>";
            div.innerHTML += "<u> Country's capital: </u> <b>" + JSON.stringify(obj[i].capital) + "</b> <br>";
            div.innerHTML += "<u> Country's currencies: </u> <b>" + JSON.stringify(obj[i].currencies) + "</b> <br>";
            RecivedDataBox.appendChild(div);
            div.style.border = '1px solid black';

            var img = document.createElement('img');
            img.id = 'img';
            img.src = ' ' + obj[i].flag + '';
            div.appendChild(img);
        }
    });
    oReq.open("GET", url);
    oReq.send();
});



