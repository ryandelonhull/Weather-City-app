$(document).ready(function () {
  var cities = [];
  var APIkey = "6412dc6b6f2a1514d4d2467c0696b00e";

  $("#searchButton").on("click", function () {
    event.preventDefault();
    var citySearch = $("#cityInput").val();
    console.log(citySearch);
    if (cities.indexOf(citySearch) == -1) {
      cities.push(citySearch);
    }
    $("#citiesSearched").empty();
    for (var i = 0; i < cities.length; i++) {
      var div = $("<div>");
      var button = $("<button>");

      button.addClass("city");
      button.attr("data-name", cities[i]);
      button.text(cities[i]);
      button.on("click", function (event) {
        event.preventDefault();
        console.log($(this).attr("data-name"));
        searchForCity($(this).attr("data-name"));
      });
      div.append(button);
      $("#citiesSearched").append(div);
    }

    searchForCity(citySearch);
  });

  function searchForCity(citySearch) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        citySearch +
        "&appid=" +
        APIkey,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      console.log(JSON.stringify(response));
      $(".name").html("<h1>" + response.name + "</h1>");
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(".temp").text(
        "Temperature: " + tempF.toFixed(2) + " Degrees Fahrenheit"
      );
      $(".humidity").text("Humidity: " + response.main.humidity + " %");
      $(".speed").text("Wind Speed: " + response.wind.speed + " MPH");
      console.log(response.coord.lat, response.coord.lon);
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      console.log(lat);
      console.log(lon);

      $.ajax({
        type: "GET",
        url:
          "http:api.openweathermap.org/data/2.5/uvi?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          APIkey,
        datatype: "json",
      }).then(function (response) {
        console.log(JSON.stringify(response));
        $(".uvIndex").html("UV Index: " + response.value);
      });

      $.ajax({
        type: "GET",
        url:
          "http://api.openweathermap.org/data/2.5/forecast?q=" +
          citySearch +
          "&appid=" +
          APIkey +
          "&units=imperial",
        datatype: "json",
      }).then(function (response) {
        console.log(JSON.stringify(response));
        for (var i = 0; i < response.list.length; i++) {
          if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var row = $("<div>").addClass("row");
            var column = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card");
            var dateTitle = $("<h5>").text(
              new Date(response.list[i].dt_txt).toLocaleDateString()
            );
            var img = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/w/" +
                response.list[i].weather[0].icon +
                ".png"
            );
            var temp = $("<p>").text(response.list[i].main.temp_max);
            var humi = $("<p>").text(response.list[i].main.humidity);
            row.append(column.append(card.append(dateTitle, img, temp, humi)));
            $("#cityForecast").append(row);
          }
        }
      });
    });
  }
});
