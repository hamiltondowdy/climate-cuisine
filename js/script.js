

function getCocktailInfo (){
 fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('whoops, somthing went wrong');
                return;
            }

            response.json().then(function(data) {
                //console.log(data);
                displayCocktailInfo(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error', err);
    });
}

getCocktailInfo();

function displayCocktailInfo(cocktail) {
    console.log(cocktail);
}


