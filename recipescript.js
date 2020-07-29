var recipeSelection = "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan";
var recipeCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var mealRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";


$.ajax({
    url: recipeCategories,
    method: "GET",
})
    .then(function (responseRecipeCategories) {
        // console.log(responseRecipeCategories.categories)
        var a = responseRecipeCategories.categories
        // console.log(a)
        a.forEach(function (entry) {
            console.log(entry.strCategory);//displays catagories
        });
        $(".currentUVIndexDisplay").html("UV Index: " + responsethree.current.uvi)
    });

$.ajax({
    url: recipeSelection,
    method: "GET",
})
    .then(function (responserecipeSelection) {
        // console.log(responserecipeSelection)
        var b = responserecipeSelection.meals
        // console.log(b)
        b.forEach(function (displayoptions) {
            console.log(displayoptions.idMeal);//displays catagories
            console.log(displayoptions.strMeal);//displays catagories
            console.log(displayoptions.strMealThumb);//displays catagories

        });


        $(".currentUVIndexDisplay").html("UV Index: " + responsethree.current.uvi)
    });

$.ajax({
    url: mealRecipe,
    method: "GET",
})
    .then(function (mealDisplay) {
        console.log(mealDisplay)
        $(".currentUVIndexDisplay").html("UV Index: " + responsethree.current.uvi)
    });