var queryURLBase1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURLBase2 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var queryURLBase3 = "http://api.openweathermap.org/data/2.5/uvi?lat=";
var authKey = "6ea95deef040e0312c5d12a77e2056ce";
var dateToday = moment().format('l');
var date2 = moment().add(1, 'days').format('l');
var date3 = moment().add(2, 'days').format('l');
var date4 = moment().add(3, 'days').format('l');
var date5 = moment().add(4, 'days').format('l');
var latitude;
var longitude;

$("#submitBtn").on("click", function () {
    searchTerm = $("#user-search").val().trim();

    var newURL1 = queryURLBase1 + searchTerm + "&APPID=" + authKey;

    $.ajax({
        url: newURL1,
        method: "GET"
    }).then(function (results) {

        var farenheit = ((results.main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var weatherIcon = $("<img>");
        weatherIcon.attr("src", "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");

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



function giveForecast() {
    searchTerm = $("#user-search").val().trim();

    var newURL2 = queryURLBase2 + searchTerm + "&APPID=" + authKey;

    $.ajax({
        url: newURL2,
        method: "GET"
    }).then(function (drivethru) {

        var farenheit1 = ((drivethru.list[0].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit2 = ((drivethru.list[8].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit3 = ((drivethru.list[16].main.temp - 273.15) * 9 / 5 + 32).toFixed();
        var farenheit4 = ((drivethru.list[24].main.temp - 273.15) * 9 / 5 + 32).toFixed();

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

function giveUV(latitude, longitude) {

    //latitude = "29";
    //longitude = "-127.5";

    var newURL3 = queryURLBase3 + latitude + "&lon=" + longitude + "&APPID=" + authKey;

    $.ajax({
        url: newURL3,
        method: "GET"
    }).then(function (response) {
        console.log(response.value);
    })
};

//giveUV();

var cityList = $("#city-list");
var cityHistory = [];

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    var newCity = $("#user-search").val();


    if (newCity === "") {
        return;
    }

    cityHistory.push(newCity);

    console.log(cityHistory);

    //localStorage.setItem('Previous City Searched', cityHistory);
    localStorage.setItem(cityHistory, cityHistory);
    renderCities(newCity);


});

function renderCities(newCity) {
    //for (var i = 0; i < cityHistory.length; i++) {
        //var city = cityHistory[i];

        var li = $("<li>");
        li.text(newCity);
        $("#city-list").append(li);
        console.log("CITIESRENDERED");
    //
    
};
