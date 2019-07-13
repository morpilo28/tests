"use strict";
var ReceivedDataBox = document.getElementById('ReceivedDataBox');
var country = document.getElementById('country');// getting the input element

document.getElementById('onlyOneCountry').addEventListener('click', function (e) {
    e.preventDefault();
    var countClicks = 0;
    ReceivedDataBox.innerHTML = '';
    if (country.value == '') {
        alert('Please enter a name/partial name of a country');
    } else {
        let url2 = "https://restcountries.eu/rest/v2/name/" + country.value;
        let oReq = new XMLHttpRequest();
        oReq.open('GET', url2);
        oReq.send();
        oReq.addEventListener("load", function () {
            let obj = JSON.parse(this.responseText);
            if (obj.status == 404) {
                alert('Country not found');
            }
            for (let i = 0; i < obj.length; i++) {
                let objNameLowerCased = obj[i].name.toLowerCase();
                let countryValueLowerCased = country.value.toLowerCase();
                if (objNameLowerCased.includes(countryValueLowerCased)) {  
                    let bigDiv = document.createElement('div');  //contains img + details div
                    bigDiv.id = 'bigDiv';
                    ReceivedDataBox.appendChild(bigDiv);

                    let img = document.createElement('img');
                    img.id = 'img';
                    img.src = obj[i].flag;
                    bigDiv.appendChild(img);

                    let div = document.createElement('div');  //details div
                    div.id = 'div';
                    let divData = "<b><u>" + obj[i].name + "</b></u><br>";
                    divData += "<b>Top Level Domain</b>: " + obj[i].topLevelDomain + "<br>";
                    divData += "<b>Capital</b>: " + obj[i].capital + "<br>";
                    divData += "<b>Currencies(code, name, symbol)</b>: <br>";

                    for (let j = 0; j < (obj[i].currencies).length; j++) {
                        divData += obj[i].currencies[j].code + ", " + obj[i].currencies[j].name + ", " + obj[i].currencies[j].symbol + "<br>";
                    }
                    bigDiv.appendChild(div);
                    div.innerHTML = divData;
                } else {
                    countClicks++;
                    if (countClicks == obj.length) {
                        alert('Country not found');
                    }
                }
            }
            country.value = '';
        });
    }
});

document.getElementById('allCountries').addEventListener('click', function (e) {
    e.preventDefault();
    const url = "https://restcountries.eu/rest/v2/all";
    ReceivedDataBox.innerHTML = '';
    let oReq = new XMLHttpRequest();
    oReq.open("GET", url);
    oReq.send();
    oReq.addEventListener("load", function () {
        let obj = JSON.parse(this.responseText);
        for (let i = 0; i < obj.length; i++) {

            let bigDiv = document.createElement('div');
            bigDiv.id = 'bigDiv';
            ReceivedDataBox.appendChild(bigDiv);

            let img = document.createElement('img');
            img.id = 'img';
            img.src = obj[i].flag;
            bigDiv.appendChild(img);

            let div = document.createElement('div');
            div.id = 'div';

            let divData = "<b><u>" + obj[i].name + "</b></u><br>";
            divData += "<b>Top Level Domain</b>: " + obj[i].topLevelDomain + "<br>";
            divData += "<b>Capital</b>: " + obj[i].capital + "<br>";
            divData += "<b>Currencies(code, name, symbol)</b>: <br>";

            for (let j = 0; j < (obj[i].currencies).length; j++) {
                divData += obj[i].currencies[j].code + ", " + obj[i].currencies[j].name + ", " + obj[i].currencies[j].symbol + "<br>";
            }
            bigDiv.appendChild(div);
            div.innerHTML = divData;
        }
    });
});



