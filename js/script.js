
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
};


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
        chosenMeal = hotMeals[Math.floor(Math.random() * (hotMeals.length-1))];
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

// Dom Elmenet refrence
//1- get the result div ID
var resultEl = document.getElementById("result");
//2- get the form ID
var cityFormEl=document.getElementById("city-form");
//3- get the input field of the form section 
var cityInputEl=document.getElementById("cityname");
//4- get the search button by ID
var searchBtn =document.getElementById("searchBTn");
// creating Element dynamically for weather information 
//1- create an <h3> element to hold the city name
var nameEl =document.createElement("h3")
// give the <h3> element a style 
nameEl.setAttribute("class","city-name");
//2- create an <img> element to hold the weather icon
var iconEl =document.createElement("img");
// assign an SRC attribute to hold the icon URL
iconEl.setAttribute("src","");
//1- create an <p> elements to hold the weather information 
var tempEl= document.createElement("p");
var humidityEl= document.createElement("p");
var windEl= document.createElement("p");
var descEl= document.createElement("p");
// appending the dynamically created element
resultEl.append(nameEl,iconEl,tempEl,humidityEl,windEl, descEl);

//Api key 
var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
 // function to get the city name w
 var getCity =function(event){
    // prevent the browser from performing thr default action 
    event.preventDefault();
    //get the city name from the ccity input snd trim it if there is any spacing 
    var cityName = cityInputEl.value.trim();
    //check if the user enter a city name 
    if(cityName){
        //run the get weather function 
        getWaetherInfo(cityName);
        //clear the input filed 
        cityInputEl.value="";
        // if there is no input for the user 
    }else{
        // alert the user to enster a valid city 
        alert("please enter a valid city")
    }
}
// get weather info function 
var getWaetherInfo =function (city){

// get weather info function, to test the URl change the (+ city +) with any city name 
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+apiKey;
//make a request to the url 
fetch(apiUrl).then(function(response){
    // if the response is okay 
    if (response.ok){
        //get the data 
        response.json().then(function(data){
               // run dsiplay weathr function 
               getWeather(data,city);
        });
        // if the city name was wrong 
    }else{
        // alert the user // must change to a popup message element  
        alert("error City not found");
    }
})
// if there is any network error
.catch(function(error){
    //alert the user // must change to a popup message element 
    alert("Unable to connect to the server")
});
};
//get weather information on the website 
var getWeather = function(data){
    //define variables for the weather data
    var {name} = data;
    var {icon,description}=data.weather[0];
    var {temp,humidity}=data.main;
console.log (name,icon,temp,humidity,description)

    //write the weather infromation in each element 

 
    //write the information in each element
    nameEl.innerText = "Weather in " + name;
    //iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText = "Temp: "+ temp + "°F";
    humidityEl.innerText = "Humidity "+ humidity; 
    descEl.innerText = description; 

};

//display random cities on the first HTML page
//display random cities on the first HTML page
var randomCity =function(){
    //cities array
    var cities= ["london","tokyo","paris","amsterdam","toronto", "moscow","dubai"];
    // check the array length and loop over the array 
    for( var i = 0;i < cities.length ; i++){
        // set timeouts to dealy the next city 
        (function(i){
            var time =setTimeout(function(){
                getWaetherInfo(cities[i]);
                // random images for the HTML background
                document.body.style.backgroundImage =
                "url('https://source.unsplash.com/1600x900/?" + cities[i] + "')";


            },5000*(i+1));
           
        })(i);
        i++;
    }
}
        
//callimng the randomCity function
//var randomCity = function(){

            //},5000*(i));
            //},5000*(i));

            // function to stop the timer 
            var stopTime = function (){
                // stop the timer
                clearTimeout(time);
            }
            searchBtn.addEventListener("click", stopTime);
        //})(i);
    //}
    
//}
//callimng the randomCity function
randomCity();
// if the search button was clicked show the chosen city
searchBtn.addEventListener("click", getCity);

    
    

