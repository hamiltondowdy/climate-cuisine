//Api key 
var apiKey ="5d1bf1cd99bc77abc1a5d1777f514808";
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