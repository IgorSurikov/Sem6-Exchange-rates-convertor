let currencies;


function createResult(data) {
    let article = document.getElementById('convertor-result');
    article.innerHTML = ''
    let result = document.createElement('H3')
    result.textContent = `Результат: ${data.result}`
    article.appendChild(result)
}


function LoadBaseСurrencies(params) {
    let currencies_select_to = document.getElementById("currenciesSelectТо");
    let currencies_select_from = document.getElementById("currenciesSelectFrom");

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
            currencies_select_to.appendChild(el);
            currencies_select_from.appendChild(el.cloneNode(true));
        }
    }
}

LoadBaseСurrencies();

let form = document.forms.mainForm
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let to = form.elements.currenciesSelectТо.value
    let from = form.elements.currenciesSelectFrom.value
    let amount = form.elements.CurAmount.value
    console.log(to)
    console.log(from)
    console.log(amount)


    let requestURL = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        let response = request.response;
        console.log(response)
        createResult(response)
    }




})












