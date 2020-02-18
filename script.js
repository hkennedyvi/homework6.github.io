const weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=";
const authKey = "6ea95deef040e0312c5d12a77e2056ce";
let dateToday = moment().format('l');
let date2 = moment().add(1, 'days').format('l');
let date3 = moment().add(2, 'days').format('l');
let date4 = moment().add(3, 'days').format('l');
let date5 = moment().add(4, 'days').format('l');
let latitude;
let longitude;
let cityList = $("#city-list");
let cityHistory = [];

$(document).ready(() => {
$("#search-button").on("click", () => {
    let searchTerm = $("#user-search").val().trim();

    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
      }

    let newURL1 = weatherURL + searchTerm + "&APPID=" + authKey;

    $.ajax({
        url: newURL1,
        method: "GET"
    }).then((results) => {
        makeRow(searchTerm);
        let farenheit = ((results.main.temp - 273.15) * 9 / 5 + 32).toFixed();
        let weatherIcon = $("<img>");
        weatherIcon.attr("src", "https://openweathermap.org/img/w/" + results.weather[0].icon + ".png");

        $(".city-main").text(results.name + " " + dateToday);
        $(".city-main").append(weatherIcon);
        $(".temp-main").text("Temperature: " + farenheit + " ºF");
        $(".humid-main").text("Humidity: " + results.main.humidity + " %");
        $(".wind-main").text("Wind Speed: " + results.wind.speed + " MPH");
        $(".date1").text(dateToday);
        $(".temp1").text(farenheit + " ºF");


        latitude = results.coord.lat;
        longitude = results.coord.lon;
        giveUV(latitude, longitude);

    })

    giveForecast();

});



giveForecast = () => {
    searchTerm = $("#user-search").val().trim();

    let newURL2 = forecastURL + searchTerm + "&APPID=" + authKey;

    $.ajax({
        url: newURL2,
        method: "GET"
    }).then(function (results) {

        var farenheit1 = ((results.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit2 = ((results.list[8].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit3 = ((results.list[16].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit4 = ((results.list[24].main.temp - 273.15) * 9 / 5 + 32).toFixed();

        $(".date2").text(date2);
        $(".temp2").text(farenheit1 + " ºF");
        $(".date3").text(date3);
        $(".temp3").text(farenheit2 + " ºF");
        $(".date4").text(date4);
        $(".temp4").text(farenheit3 + " ºF");
        $(".date5").text(date5);
        $(".temp5").text(farenheit4 + " ºF");
    })

};

giveUV = (latitude, longitude) => {

    var newURL3 = uvURL + latitude + "&lon=" + longitude + "&APPID=" + authKey;

    $.ajax({
        url: newURL3,
        method: "GET"
    }).then(function (results) {
        $(".uv-main").text("UV Index: " + results.value);
    })
};



$("#submitBtn").on("click", (event) => {
    event.preventDefault();

    let newCity = $("#user-search").val();


    if (newCity === "") {
        return;
    }

    cityHistory.push(newCity);

    localStorage.setItem(cityHistory, cityHistory);
    renderCities(newCity);


});

function renderCities(newCity) {

    var oldCity = $("<input>");
    oldCity.val(newCity);
    $("#city-list").append(oldCity);

};
});