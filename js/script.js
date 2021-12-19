// Array of drink IDs
var coldDrinks = [11634, 17267, 178358, 13936];
var coolDrinks = [14282, 16987, 17239, 17255];
var warmDrinks = [15933, 11326, 178334, 12560];
var hotDrinks = [11320, 178352, 16485, 17212];

// Selected drink ID
var selectedDrink = "";


// Static URL variable cocktail DB
var cocktailApiUrl = "";


// Temperature basis input
var chosenCityTemp = 30;



// Function to select drink based on temp
var getDrinkId = function () {

    if (chosenCityTemp <= 30) {
        selectedDrink = coldDrinks[Math.floor(Math.random() * (coldDrinks.length-1))];
    } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
        selectedDrink = coolDrinks[Math.floor(Math.random() * (coolDrinks.length-1))];
    } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
        selectedDrink = warmDrinks[Math.floor(Math.random() * (warmDrinks.length-1))];
    } else if (chosenCityTemp > 80) {
        selectedDrink = hotDrinks[Math.floor(Math.random() * (hotDrinks.length-1))];
    } else {
        console.log("error");
    };
    cocktailApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + selectedDrink;
    getDrink();
}


var getDrink = function () {
 fetch(cocktailApiUrl)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('whoops, somthing went wrong');
                return;
            }

            response.json().then(function(data) {
                displayCocktailInfo(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error', err);
    });
};


