var queryURLBase = "http://api.openweathermap.org/data/2.5/weather?q=";
var cityName = "Portland";
var authKey = "6ea95deef040e0312c5d12a77e2056ce";
var queryURL = queryURLBase + cityName + "&APPID=" + authKey;

function runQuery() {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (drivethru) {
        console.log(drivethru);
        console.log(drivethru.name);
        console.log(drivethru.main.temp);
        console.log(drivethru.main.humidity);
        console.log(drivethru.wind.speed);
    })
};

runQuery();

