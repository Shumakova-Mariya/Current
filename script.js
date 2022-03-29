var response, content, formatDate, response2, content2, date
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

async function getResponse () {
    response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    content = await response.json()
    nameOutput();
}

function nameOutput () {
    var Valute = Object.values(content.Valute);
    Valute.forEach(function (item, index){
        document.querySelector('.listOfCurrencies-tab').innerHTML += `
            <div id="item${index}" title="${item.Name}" class="listOfCurrencies-body">
                    <li class="listOfCurrencies-item">
                        <h3>${item.CharCode}</h3>
                        <h3>${item.Value.toFixed(2)}</h3>
                        <h3>${calculateDifference(item.Value, item.Previous)}%</h3>
                    </li>
            </div>
        `
    });

    Valute.forEach(function (item, index){
        document.getElementById("item"+index).addEventListener("click", function() {
            for (let i = 0; i <=9; i++) {
                date = new Date();
                date.setDate(-i);
                function addLeadingZero(d){
                    return (d < 10) ? '0' + d : d;
                }
                function getDate(date) {
                    var Y = date.getFullYear();
                    var M = addLeadingZero(date.getMonth() + 2);
                    var D = addLeadingZero(date.getDate());
                    formatDate = Y + '/' + M + '/' + D

                }
                console.log(getDate(date))
                document.querySelector('.modal-tab').innerHTML += `
                    <div id="item${index}" title="${item.Name}" class="modal-body">
                        <li class="modal-item">
                            <h4>${formatDate}</h4>
                            <h4>${item.Value.toFixed(2)}</h4>
                        </li>
                    </div>
                `
            }
            modal.style.display = "block";
        });
    });
}

async function getResponse2 (date, currency) {
    response2 = await fetch('https://www.cbr-xml-daily.ru/archive/'
        + formatDate +
        '/daily_json.js')
    content2 = await response2.json()
    nameOutput (content2.Valute);
}

function calculateDifference (current, prev) {
    const diff = ((current - prev) / prev) * 100;
    return diff.toFixed(2);
}

getResponse();
getResponse2(formatDate,item.Value);


