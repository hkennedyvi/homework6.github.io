var queryURLBase1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURLBase2 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var cityName = "Portland";
var authKey = "6ea95deef040e0312c5d12a77e2056ce";
var queryURL1 = queryURLBase1 + cityName + "&APPID=" + authKey;
var queryURL2 = queryURLBase2 + cityName + "&APPID=" + authKey;
var dateToday = moment().format('l');
var date2 = moment().add(1, 'days').format('l');
var date3 = moment().add(2, 'days').format('l');
var date4 = moment().add(3, 'days').format('l');
var date5 = moment().add(4, 'days').format('l');

function giveForecast() {

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (drivethru) {

        var farenheit1 = ((drivethru.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit2 = ((drivethru.list[8].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit3 = ((drivethru.list[16].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit4 = ((drivethru.list[24].main.temp - 273.15) * 9 / 5 + 32).toFixed();

        console.log(drivethru);
        console.log(drivethru.list[0].main.temp);
        console.log(drivethru.list[8].main.temp);
        console.log(drivethru.list[16].main.temp);
        console.log(drivethru.list[24].main.temp);
        console.log(drivethru.list[0].dt_txt);
        $(".date2").text(date2);
        $(".temp2").text(farenheit1);
        $(".date3").text(date3);
        $(".temp3").text(farenheit2);
        $(".date4").text(date4);
        $(".temp4").text(farenheit3);
        $(".date5").text(date5);
        $(".temp5").text(farenheit4);
    })

};



$("#submitBtn").on("click", function () {
    searchTerm = $("#user-search").val().trim();

    var newURL1 = queryURLBase1 + searchTerm + "&APPID=" + authKey;

    $.ajax({
        url: newURL1,
        method: "GET"
    }).then(function (results) {

        var farenheit = ((results.main.temp - 273.15) * 9 / 5 + 32).toFixed();

        console.log(results);
        $(".city-main").text(results.name + " " + dateToday);
        $(".temp-main").text("Temperature: " + farenheit + " degrees F");
        $(".humid-main").text("Humidity: " + results.main.humidity + " %");
        $(".wind-main").text("Wind Speed: " + results.wind.speed + " MPH");
        $(".date1").text(dateToday);
        $(".temp1").text(farenheit);
        console.log(farenheit + "cooool");

    })

    giveForecast();

});

var cityList = $("#city-list");
var cityHistory = [];

renderCities();

function renderCities() {
    for (var i = 0; i < cityHistory.length; i++) {
        var city = cityHistory[i];

        var li = document.createElement("li");
        li.textContent = city;
        cityList.appendChild(li);
    }
};

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var newCity = $("#user-search").val();


    if (newCity === "") {
        return;
    }

    cityHistory.push(newCity);

    console.log(cityHistory);

    localStorage.setItem('Previous City Searched', cityHistory);
});

/*function runQuery() {

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (drivethru) {
        console.log(drivethru);
        $(".city-main").text(drivethru.name + " " + dateToday);
        $(".temp-main").text("Temperature: " + drivethru.main.temp);
        $(".humid-main").text("Humidity: " + drivethru.main.humidity);
        $(".wind-main").text("Wind Speed: " + drivethru.wind.speed);
    })
};*/

