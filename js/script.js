// Array of meal IDs for MealDB API
var coldMeals = [53057, 52803, 52942, 52903, 52788];
var coolMeals = [53043, 52922, 52851, 52989, 52934];
var warmMeals = [52944, 53038, 53051, 53062, 52871];
var hotMeals = [52891, 52957, 52889, 53063, 52939];

// selected meal ID for MealDB API
var chosenMeal = ""

// static variable MealDB API URL
var mealApiUrl = "";

// Temperature in city input by user
var chosenCityTemp = 30;

// function to select random meal ID and run fetch to MealDB API
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
    mealApiUrl = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + chosenMeal;
    // console.log(chosenMeal);
    getMeal();
};

// function to fetch JSON data from MealDB API
var getMeal = function() { 
    fetch(mealApiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    // console.log(data)
                });
            } else {
                console.log("error in JSON request")
            };
        });
};
