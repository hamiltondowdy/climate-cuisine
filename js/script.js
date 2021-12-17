var coldMeals = [];
var coolMeals = [];
var warmMeals = [];
var hotMeals = [];

var chosenMeal = ""


var mealApiUrl = "www.themealdb.com/api/json/v1/1/lookup.php?i=" + chosenMeal;

var chosenCityTemp = ""

var getMealId = function() {

    if (chosenCityTemp <= 30) {
        chosenMeal = coldMeals[Math.floor(Math.random() * coldMeals.length)];
    } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
        chosenMeal = coolMeals[Math.floor(Math.random() * coolMeals.length)];
    } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
        chosenMeal = warmMeals[Math.floor(Math.random() * warmMeals.length)];
    } else if (chosenCityTemp > 80) {
        chosenMeal = warmMeals[Math.floor(Math.random() * hotMeals.length)];
    } else {
        console.log("error on meal choice")
    };
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