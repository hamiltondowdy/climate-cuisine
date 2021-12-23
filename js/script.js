var cityHistory=[];
//Api key 
var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
// Dom Elmenet refrence
//1- get the result div ID
var resultEl = document.getElementById("result");
//2- 1- get the weather forecast div ID from the second page 
var weatherForecast = document.getElementById("weather-forecast");
//3- get the form ID
var cityFormEl=document.getElementById("city-form");
//4- get the input field of the form section 
var cityInputEl=document.getElementById("cityname");
//5- get the search button by ID
var searchBtn =document.getElementById("searchBTn");
//6- create a history container 
var historyContainer =  document.getElementById("city-history");
// creating Element dynamically for weather information 
//1- create an <h3> element to hold the city name
var nameEl =document.createElement("a")
// give the <h3> element a style 
nameEl.setAttribute("class","city-name");
nameEl.setAttribute("href", "./second-page.html")
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


     // Function to update history in local storage then updates displayed history.
     function appendToHistory(city) {
        // If there is no search term return the function
        if (cityHistory.indexOf(city) !== -1) {
        return;
      }
      cityHistory.push(city);
   
     localStorage.setItem('search-history',JSON.stringify(cityHistory));
   }

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
          getWeather(data, city);
        });
        // if the city name was wrong
      } else {
        // alert the user // must change to a popup message element
        alert("error City not found");
      }
    })
    // if there is any network error
    .catch(function (error) {
      //alert the user // must change to a popup message element
      alert("Unable to connect to the server");
    });
};

//get weather information on the website 
var getWeather = function(data){
    //define variables for the weather data
    var {name} = data;
    var {icon,description}=data.weather[0];
    var {temp,humidity}=data.main;
    console.log (name,icon,temp,humidity,description);
    //write the weather infromation in each element 
    nameEl.innerText = "Weather in " + name;
    iconEl.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    tempEl.innerText = "Temp: "+ temp + "°F";
    humidityEl.innerText = "Humidity: "+ humidity; 
    descEl.innerText = description; 
}
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
            },5000*(i));
            // function to stop the timer 
            var stopTime = function (){
                // stop the timer
                clearTimeout(time);
            }
            searchBtn.addEventListener("click", stopTime);
        })(i);
    }
    
}
//callimng the randomCity function
randomCity();
//callimng the randomCity function
// if the search button was clicked show the chosen city
searchBtn.addEventListener("click", getCity);

searchBtn.addEventListener("click",document)



<!-- My code 2 begin  -->


<!-- My code 2 end  -->

