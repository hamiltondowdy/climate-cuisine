var historyContainer = document.getElementById("city-history");
    // Function to get search history from local storage
    var intialSearch = function(){
        var storedHistory = JSON.parse(window.localStorage.getItem("search-history")) || [];
        //sort the search 
        storedHistory.sort(function(a,b){
            return b.storedHistory - a.storedHistory
        })
        for (var i =0; i<storedHistory.length;i++){
            var liItems=document.createElement("li");
            liItems.textContent=storedHistory[i];

            historyContainer.append(liItems);

      
        }
    }
    intialSearch(); 
    //   if (storedHistory){
    //     cityHistory=JSON.parse(storedHistory);