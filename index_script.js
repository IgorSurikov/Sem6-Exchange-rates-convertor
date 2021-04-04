let currencies;


function createExchangeRatesTable(data) {
    let article = document.getElementById('rates-list');
    article.innerHTML = ''
    let table = document.createElement('table');
    let header_row = document.createElement('tr');
    header_row.innerHTML = '<th>Код Валюты</th><th>Название Валюты</th><th>Курс</th>';
    table.appendChild(header_row)


    for (var prop in data.rates) {
        let tr = document.createElement('tr');

        let cur_name = document.createElement('td');
        let cur_code = document.createElement('td');
        let rate = document.createElement('td');

        cur_name.textContent = currencies[prop].description
        cur_code.textContent = prop
        rate.textContent = data.rates[prop]


        tr.appendChild(cur_code)
        tr.appendChild(cur_name)
        tr.appendChild(rate)
        table.appendChild(tr)

    }

    article.appendChild(table)
}




function LoadBaseСurrencies(params) {
    let currencies_select = document.getElementById("currenciesSelect");
    document.getElementById('currenciesDate').valueAsDate = new Date();

    let requestURL = 'https://api.exchangerate.host/symbols';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        currencies = response.symbols

        console.log(response)

        for (var prop in response.symbols) {
            let el = document.createElement("option");
            el.textContent = response.symbols[prop].code + ' - ' + response.symbols[prop].description;
            el.value = response.symbols[prop].code;
            currencies_select.appendChild(el);
        }
    }
}

LoadBaseСurrencies();

let form = document.forms.mainForm
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let cur = form.elements.currenciesSelect.value
    let date = form.elements.currenciesDate.value
    console.log(cur)
    console.log(date)


    let requestURL = `https://api.exchangerate.host/${date}?base=${cur}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        console.log(response)
        createExchangeRatesTable(response)
    }




})












