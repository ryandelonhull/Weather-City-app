$(document).ready(function(){

    var cities = []


    
    $("#searchButton").on("click", function(){
        event.preventDefault();
        var citySearch =$("#cityInput").val();
        console.log(citySearch);
        //$("#citiesSearched").empty();
        for (var i = 0; i < cities.length; i++){
        var a = $("<button>");
        a.addClass("city");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#citiesSearched").push(a);
        }

        searchForCity(citySearch);
        
    }) 



    function searchForCity(citySearch){
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=6412dc6b6f2a1514d4d2467c0696b00e",
            dataType: "json",
        }).then(function(response){
            console.log(response);
            console.log(JSON.stringify(response));
            $(".name").html("<h1>" + response.name + currentDate + "</h1>");
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            $(".temp").text("Temperature: " + tempF.toFixed(2) + "\U+2109");
            $(".humidity").text("Humidity: " + response.humidity + "%");
            $(".speed").text("Wind Speed: " + response.wind.speed + "MPH");



        })
    } 

































    // $(document).on("click", ".city", alertMovieName);


})