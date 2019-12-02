var queryURLBase1 = "http://api.openweathermap.org/data/2.5/weather?q=";
var queryURLBase2 = "http://api.openweathermap.org/data/2.5/forecast?q=";
var cityName = "Portland";
var authKey = "6ea95deef040e0312c5d12a77e2056ce";
var queryURL1 = queryURLBase1 + cityName + "&APPID=" + authKey;
var queryURL2 = queryURLBase2 + cityName + "&APPID=" + authKey;
var dateToday = moment().format('l');
var date2 = moment().add(1, 'days').calendar();
var date3 = moment().add(2, 'days').calendar();
var date4 = moment().add(3, 'days').calendar();
var date5 = moment().add(4, 'days').calendar();



function runQuery() {

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
};
function runQueryAgain () {
    
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (drivethru) {
        console.log(drivethru);
        console.log(drivethru.list[0].main.temp);
        console.log(drivethru.list[8].main.temp);
        console.log(drivethru.list[16].main.temp);
        console.log(drivethru.list[24].main.temp);
        console.log(drivethru.list[0].dt_txt);
        $(".date2").text(date2);
        $(".temp2").text(drivethru.list[0].main.temp);
        $(".date3").text(date3);
        $(".temp3").text(drivethru.list[8].main.temp);
        $(".date4").text(date4);
        $(".temp4").text(drivethru.list[16].main.temp);
        $(".date5").text(date5);
        $(".temp5").text(drivethru.list[24].main.temp);
    })

};

runQueryAgain();

$("#submitBtn").on("click", function() {
    searchTerm = $("#user-search").val().trim();

    var newURL1 = queryURLBase1 + searchTerm + "&APPID=" + authKey;
    $.ajax({
        url: newURL1,
        method: "GET"
    }).then(function (results) {
        console.log(results);
        $(".city-main").text(results.name + " " + dateToday);
        $(".temp-main").text("Temperature: " + results.main.temp + " degrees F");
        $(".humid-main").text("Humidity: " + results.main.humidity + " %");
        $(".wind-main").text("Wind Speed: " + results.wind.speed + " MPH");
        $(".date1").text(dateToday);
        $(".temp1").text(results.main.temp);
    })

});



