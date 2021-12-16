//Api key 
var apiKey ="d092e4c696e2cfb7a6d26f9f58875d39";
// get weather info function 
var getWaetherInfo =function (city,data){
// get weather info function, to test the URl change the (+ city +) with any city name 
var apiUrl="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid="+apiKey;
//make a request to the url 
fetch(apiUrl).then(function(response){
    // if the response is okay 
    if (response.ok){
        //get the data 
        response.json().then(function(data){
           
            console,log(data,city);
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
};

//display random cities on the first HTML page
var randomCity =function(){
    //cities array
    var cities= ["london","tokyo","paris","amsterdam","toronto", "moscow","dubai"];
    // let the i = 0
    var i = 0;
    // check the array length and loop over the array 
    while(i = cities.length){
        // set timeouts to dealy the next city 
        (function(i){
            setTimeout(function(){
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
randomCity();