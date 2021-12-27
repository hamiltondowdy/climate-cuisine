var chosenCityTemp;
var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";

var mealBoxEl = document.querySelector("#meal-box");
var drinkBoxEl = document.querySelector("#drink-box");

var historyContainer = document.getElementById("city-history");
var weatherInfo = document.getElementById("weather-info");
//get the name span by ID
var nameEl =document.getElementById("city-name")
var iconEl = document.createElement("img");
// assign an SRC attribute to hold the icon URL
iconEl.setAttribute("src","");
//create an <p> elements to hold the weather information 
var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var descEl= document.createElement("p");
// appending the dynamically created element
weatherInfo.append(tempEl,humidityEl,descEl);

    // Function to get search history from local storage
    var intialSearch = function(){
      var storedHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];
      for (var i = storedHistory.length -1 ;i>=0;i--){
          var liItems=document.createElement("li");
          var items=document.createElement("a");
          items.setAttribute("class","historyAnc");
          items.setAttribute("data-search",storedHistory[i]);
          liItems.append(items);
          items.textContent=storedHistory[i];
          console.log(storedHistory);
          historyContainer.append(liItems);
      }
  }
  intialSearch(); 

// get weather info function
var getWaetherInfo = function (city) {
  // get weather info function, to test the URl change the (+ city +) with any city name
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  //make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // if the response is okay
      if (response.ok) {
        //get the data
        response.json().then(function (data) {
          // run dsiplay weathr function
          getWeather(data);
        });
        // if the city name was wrong
      } else {
        // alert the user // must change to a popup message element
      //   alert("error City not found");
      swal("error City not found",{
         buttons: {
             cancel:true,
             confirm:false,
         },
      })
      }
    })
    // if there is any network error
    .catch(function (error) {
      //alert the user // must change to a popup message element
      swal("Unable to connect to the server",{
        buttons: {
            cancel:true,
            confirm:true,
        },
      })
    });
};
//get weather information on the website 
var getWeather = function(data){
  //define variables for the weather data
  var {name} = data;
  var {icon,description}=data.weather[0];
  var {temp,humidity}=data.main;
  chosenCityTemp=data.main.temp;
  console.log (name,icon,chosenCityTemp,humidity,description);
  //write the weather infromation in each element 
  nameEl.innerText = name;
  iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
  tempEl.innerText = "Temp: "+ chosenCityTemp + "°F";
  humidityEl.innerText = "Humidity: "+ humidity; 
  descEl.innerText = description; 
  getMealId();
  getDrinkId();
}

// Array of drink IDs
var coldDrinks = [11634, 17267, 178358, 13936];
var coolDrinks = [14282, 16987, 17239, 17255];
var warmDrinks = [15933, 11326, 178334, 12560];
var hotDrinks = [11320, 178352, 16485, 17212];

// Selected drink ID
var selectedDrink = "";

// Static URL variable cocktail DB
var cocktailApiUrl = "";

// Function to select drink based on temp
var getDrinkId = function () {
    if (chosenCityTemp <= 30) {
      selectedDrink =
        coldDrinks[Math.floor(Math.random() * (coldDrinks.length - 1))];
    } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
      selectedDrink =
        coolDrinks[Math.floor(Math.random() * (coolDrinks.length - 1))];
    } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
      selectedDrink =
        warmDrinks[Math.floor(Math.random() * (warmDrinks.length - 1))];
    } else if (chosenCityTemp > 80) {
      selectedDrink =
        hotDrinks[Math.floor(Math.random() * (hotDrinks.length - 1))];
    } else {
      console.log("error");
    }
    cocktailApiUrl =
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + selectedDrink;
    getDrink();
};
var getDrink = function () {
    fetch(cocktailApiUrl)
      .then(function (response) {
        if (response.status !== 200) {
          console.log("whoops, somthing went wrong");
          return;
        }
  
        response.json().then(function (data) {
          displayCocktailInfo(data);
          console.log(data);
        });
      })
      .catch(function (err) {
        console.log("Fetch Error", err);
      });
  };

var displayCocktailInfo = function(data) {
  
  drinkBoxEl.innerHTML="";
  var drinkIconEl = document.createElement("img");
  drinkIconEl.setAttribute("class","image");
  drinkIconEl.src= data.drinks[0].strDrinkThumb;
  drinkIconEl.setAttribute("alt", "image of selected meal");
  drinkBoxEl.appendChild(drinkIconEl);
 console.log(drinkIconEl);
  // add meal title
  var drinkTitleEl = document.createElement("h3");
  drinkTitleEl.textContent = data.drinks[0].strDrink; 
  drinkBoxEl.appendChild(drinkTitleEl);
  
  
  // add meal ingredients
  var drinkIngListEl = document.createElement("ul");
  drinkBoxEl.appendChild(drinkIngListEl);


  if (data.drinks[0].strIngredient1 !== null) {
    var drinkIngredient1 = document.createElement("li");
    drinkIngredient1.textContent = data.drinks[0].strIngredient1 + " " + data.drinks[0].strMeasure1;
    drinkBoxEl.appendChild(drinkIngredient1);
  }
  if (data.drinks[0].strIngredient2 !== null) {
    var drinkIngredient2 = document.createElement("li");
    drinkIngredient2.textContent = data.drinks[0].strIngredient2 + " " + data.drinks[0].strMeasure2;
    drinkBoxEl.appendChild(drinkIngredient2);
  }
  if (data.drinks[0].strIngredient3 !== null) {
    var drinkIngredient3 = document.createElement("li");
    drinkIngredient3.textContent = data.drinks[0].strIngredient3 + " " + data.drinks[0].strMeasure3;
    drinkBoxEl.appendChild(drinkIngredient3);
  }
  if (data.drinks[0].strIngredient4 !== null) {
    var drinkIngredient4 = document.createElement("li");
    drinkIngredient4.textContent = data.drinks[0].strIngredient4 + " " + data.drinks[0].strMeasure4;
    drinkBoxEl.appendChild(drinkIngredient4);
  }
  if (data.drinks[0].strIngredient5 !== null) {
    var drinkIngredient5 = document.createElement("li");
    drinkIngredient5.textContent = data.drinks[0].strIngredient5 + " " + data.drinks[0].strMeasure5;
    drinkBoxEl.appendChild(drinkIngredient5);
  }
  if (data.drinks[0].strIngredient6 !== null) {
    var drinkIngredient6 = document.createElement("li");
    drinkIngredient6.textContent = data.drinks[0].strIngredient6 + " " + data.drinks[0].strMeasure6;
    drinkBoxEl.appendChild(drinkIngredient6);
  }
  if (data.drinks[0].strIngredient7 !== null) {
    var drinkIngredient7 = document.createElement("li");
    drinkIngredient7.textContent = data.drinks[0].strIngredient7 + " " + data.drinks[0].strMeasure7;
    drinkBoxEl.appendChild(drinkIngredient7);
  }
  if (data.drinks[0].strIngredient8 !== null) {
    var drinkIngredient8 = document.createElement("li");
    drinkIngredient8.textContent = data.drinks[0].strIngredient8 + " " + data.drinks[0].strMeasure8;
    drinkBoxEl.appendChild(drinkIngredient8);
  }
  if (data.drinks[0].strIngredient9 !== null) {
    var drinkIngredient9 = document.createElement("li");
    drinkIngredient9.textContent = data.drinks[0].strIngredient9 + " " + data.drinks[0].strMeasure9;
    drinkBoxEl.appendChild(drinkIngredient9);
  }
  if (data.drinks[0].strIngredient10 !== null) {
    var drinkIngredient10 = document.createElement("li");
    drinkIngredient10.textContent = data.drinks[0].strIngredient10 + " " + data.drinks[0].strMeasure10;
    drinkBoxEl.appendChild(drinkIngredient10);
  }
  if (data.drinks[0].strIngredient11 !== null) {
    var drinkIngredient11 = document.createElement("li");
    drinkIngredient10.textContent = data.drinks[0].strIngredient11 + " " + data.drinks[0].strMeasure11;
    drinkBoxEl.appendChild(drinkIngredient11);
  }
  if (data.drinks[0].strIngredient12 !== null) {
    var drinkIngredient12 = document.createElement("li");
    drinkIngredient12.textContent = data.drinks[0].strIngredient12 + " " + data.drinks[0].strMeasure12;
    drinkBoxEl.appendChild(drinkIngredient12);
  }
  if (data.drinks[0].strIngredient13 !== null) {
    var drinkIngredient13 = document.createElement("li");
    drinkIngredient13.textContent = data.drinks[0].strIngredient13 + " " + data.drinks[0].strMeasure13;
    drinkBoxEl.appendChild(drinkIngredient13);
  }
  if (data.drinks[0].strIngredient14 !== null) {
    var drinkIngredient14 = document.createElement("li");
    drinkIngredient14.textContent = data.drinks[0].strIngredient14 + " " + data.drinks[0].strMeasure14;
    drinkBoxEl.appendChild(drinkIngredient14);
  }
  if (data.drinks[0].strIngredient15 !== null) {
    var drinkIngredient15 = document.createElement("li");
    drinkIngredient15.textContent = data.drinks[0].strIngredient15 + " " + data.drinks[0].strMeasure15;
    drinkBoxEl.appendChild(drinkIngredient15);
  }
  
  // add meal instructions
  var drinkCon =document.createElement("div");
  drinkCon.setAttribute("class","instructions");
  var drinkInstructionsEl = document.createElement("p");
  
  drinkInstructionsEl.textContent = data.drinks[0].strInstructions; 
  drinkCon.append(drinkInstructionsEl)
  drinkBoxEl.appendChild(drinkCon);
};  

// Array of meal IDs for MealDB API
var coldMeals = [53057, 52803, 52942, 52903, 52788];
var coolMeals = [53043, 52922, 52851, 52989, 52934];
var warmMeals = [52944, 53038, 53051, 53062, 52871];
var hotMeals = [52891, 52957, 52889, 53063, 52939];

// selected meal ID for MealDB API
var chosenMeal = "";

// static variable MealDB API URL
var mealApiUrl = "";

// function to select random meal ID and run fetch to MealDB API
var getMealId = function () {
  if (chosenCityTemp <= 30) {
    chosenMeal = coldMeals[Math.floor(Math.random() * (coldMeals.length - 1))];
  } else if (chosenCityTemp > 30 && chosenCityTemp <= 60) {
    chosenMeal = coolMeals[Math.floor(Math.random() * (coolMeals.length - 1))];
  } else if (chosenCityTemp > 60 && chosenCityTemp <= 80) {
    chosenMeal = warmMeals[Math.floor(Math.random() * (warmMeals.length - 1))];
  } else if (chosenCityTemp > 80) {
    chosenMeal = hotMeals[Math.floor(Math.random() * (hotMeals.length - 1))];
  } else {
    console.log("error on meal choice");
  }
  mealApiUrl = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + chosenMeal;
  console.log(chosenMeal);
  getMeal();
};

// function to fetch JSON data from MealDB API
var getMeal = function () {
  fetch(mealApiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        // console.log(data.meals[0].strIngredient1)
        displayMealInfo(data);
      });
    } else {
      console.log("error in JSON request");
    }
  });
};




var displayMealInfo = function(data) {
  mealBoxEl.innerHTML="";
  // add meal icon to meal section
  var mealIconEl = document.createElement("img");
  var picHolder = document.createElement("div");
  mealIconEl.src= data.meals[0].strMealThumb;
  mealIconEl.setAttribute("alt", "image of selected meal");
  mealIconEl.setAttribute("class","meal-image")
  picHolder.appendChild(mealIconEl);
  mealBoxEl.appendChild(picHolder);
console.log(mealIconEl);
  // add meal title
  var mealTitleEl = document.createElement("h3");
  mealTitleEl.textContent = data.meals[0].strMeal; 
  mealBoxEl.appendChild(mealTitleEl);
  
  // add meal ingredients
  var mealIngListEl = document.createElement("ul");
  mealBoxEl.appendChild(mealIngListEl);


  if (data.meals[0].strIngredient1 !== "") {
    var mealIngredient1 = document.createElement("li");
    mealIngredient1.textContent = data.meals[0].strIngredient1 + " " + data.meals[0].strMeasure1;
    mealBoxEl.appendChild(mealIngredient1);
  }
  if (data.meals[0].strIngredient2 !== "") {
    var mealIngredient2 = document.createElement("li");
    mealIngredient2.textContent = data.meals[0].strIngredient2 + " " + data.meals[0].strMeasure2;
    mealBoxEl.appendChild(mealIngredient2);
  }
  if (data.meals[0].strIngredient3 !== "") {
    var mealIngredient3 = document.createElement("li");
    mealIngredient3.textContent = data.meals[0].strIngredient3 + " " + data.meals[0].strMeasure3;
    mealBoxEl.appendChild(mealIngredient3);
  }
  if (data.meals[0].strIngredient4 !== "") {
    var mealIngredient4 = document.createElement("li");
    mealIngredient4.textContent = data.meals[0].strIngredient4 + " " + data.meals[0].strMeasure4;
    mealBoxEl.appendChild(mealIngredient4);
  }
  if (data.meals[0].strIngredient5 !== "") {
    var mealIngredient5 = document.createElement("li");
    mealIngredient5.textContent = data.meals[0].strIngredient5 + " " + data.meals[0].strMeasure5;
    mealBoxEl.appendChild(mealIngredient5);
  }
  if (data.meals[0].strIngredient6 !== "") {
    var mealIngredient6 = document.createElement("li");
    mealIngredient6.textContent = data.meals[0].strIngredient6 + " " + data.meals[0].strMeasure6;
    mealBoxEl.appendChild(mealIngredient6);
  }
  if (data.meals[0].strIngredient7 !== "") {
    var mealIngredient7 = document.createElement("li");
    mealIngredient7.textContent = data.meals[0].strIngredient7 + " " + data.meals[0].strMeasure7;
    mealBoxEl.appendChild(mealIngredient7);
  }
  if (data.meals[0].strIngredient8 !== "") {
    var mealIngredient8 = document.createElement("li");
    mealIngredient8.textContent = data.meals[0].strIngredient8 + " " + data.meals[0].strMeasure8;
    mealBoxEl.appendChild(mealIngredient8);
  }
  if (data.meals[0].strIngredient9 !== "") {
    var mealIngredient9 = document.createElement("li");
    mealIngredient9.textContent = data.meals[0].strIngredient9 + " " + data.meals[0].strMeasure9;
    mealBoxEl.appendChild(mealIngredient9);
  }
  if (data.meals[0].strIngredient10 !== "") {
    var mealIngredient10 = document.createElement("li");
    mealIngredient10.textContent = data.meals[0].strIngredient10 + " " + data.meals[0].strMeasure10;
    mealBoxEl.appendChild(mealIngredient10);
  }
  if (data.meals[0].strIngredient11 !== "") {
    var mealIngredient11 = document.createElement("li");
    mealIngredient11.textContent = data.meals[0].strIngredient11 + " " + data.meals[0].strMeasure11;
    mealBoxEl.appendChild(mealIngredient11);
  }
  if (data.meals[0].strIngredient12 !== "") {
    var mealIngredient12 = document.createElement("li");
    mealIngredient12.textContent = data.meals[0].strIngredient12 + " " + data.meals[0].strMeasure12;
    mealBoxEl.appendChild(mealIngredient12);
  }
  if (data.meals[0].strIngredient13 !== "") {
    var mealIngredient13 = document.createElement("li");
    mealIngredient13.textContent = data.meals[0].strIngredient13 + " " + data.meals[0].strMeasure13;
    mealBoxEl.appendChild(mealIngredient13);
  }
  if (data.meals[0].strIngredient14 !== "") {
    var mealIngredient14 = document.createElement("li");
    mealIngredient14.textContent = data.meals[0].strIngredient14 + " " + data.meals[0].strMeasure14;
    mealBoxEl.appendChild(mealIngredient14);
  }
  if (data.meals[0].strIngredient15 !== "") {
    var mealIngredient15 = document.createElement("li");
    mealIngredient15.textContent = data.meals[0].strIngredient15 + " " + data.meals[0].strMeasure15;
    mealBoxEl.appendChild(mealIngredient15);
  }
  if (data.meals[0].strIngredient16 !== "") {
    var mealIngredient16 = document.createElement("li");
    mealIngredient16.textContent = data.meals[0].strIngredient16 + " " + data.meals[0].strMeasure16;
    mealBoxEl.appendChild(mealIngredient16);
  }
  if (data.meals[0].strIngredient17 !== "") {
    var mealIngredient17 = document.createElement("li");
    mealIngredient17.textContent = data.meals[0].strIngredient17 + " " + data.meals[0].strMeasure17;
    mealBoxEl.appendChild(mealIngredient17);
  }
  if (data.meals[0].strIngredient18 !== "") {
    var mealIngredient18 = document.createElement("li");
    mealIngredient18.textContent = data.meals[0].strIngredient18 + " " + data.meals[0].strMeasure18;
    mealBoxEl.appendChild(mealIngredient18);
  }
  if (data.meals[0].strIngredient19 !== "") {
    var mealIngredient19 = document.createElement("li");
    mealIngredient19.textContent = data.meals[0].strIngredient19 + " " + data.meals[0].strMeasure19;
    mealBoxEl.appendChild(mealIngredient19);
  }
  if (data.meals[0].strIngredient20 !== "") {
    var mealIngredient20 = document.createElement("li");
    mealIngredient20.textContent = data.meals[0].strIngredient20 + " " + data.meals[0].strMeasure20;
    mealBoxEl.appendChild(mealIngredient20);
  }

  // add meal instructions
  var mealInstructionsEl = document.createElement("p")
  mealInstructionsEl.textContent = data.meals[0].strInstructions; 

  // append items to div
  mealBoxEl.appendChild(mealInstructionsEl);
};

var checkEvent = function(e){
  nameEl.innerHTML="";
  var clic = e.target;
  var city = clic.getAttribute("data-search");
  getWaetherInfo(city);
  }
  var eventCheck = function(){
  if(!checkEvent){
    return;
  }else{
    var city = JSON.parse(window.localStorage.getItem("cityValue"));
    getWaetherInfo(city);
  }
  }
  eventCheck();
  historyContainer.addEventListener("click",checkEvent);
  historyContainer.addEventListener("click",getDrinkId);
  historyContainer.addEventListener("click",getMealId);

