var coldMeals = [];
var coolMeals = [];
var warmMeals = [];
var hotMeals = [];

var chosenMeal = "52772"


var mealApiUrl = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + chosenMeal;

var chosenCityTemp = ""

var getMealId = function() {

    if (chosenCityTemp <= 30) {
        chosenMeal = coldMeals[Math.floor(Math.random() * (coldMeals.length-1))];
    } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
        chosenMeal = coolMeals[Math.floor(Math.random() * (coolMeals.length-1))];
    } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
        chosenMeal = warmMeals[Math.floor(Math.random() * (warmMeals.length-1))];
    } else if (chosenCityTemp > 80) {
        chosenMeal = warmMeals[Math.floor(Math.random() * (hotMeals.length-1))];
    } else {
        console.log("error on meal choice")
    };
    getMeal();
};


var getMeal = function() { 
    fetch(mealApiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data)
                });
            } else {
                console.log("error in JSON request")
            };
        });
};