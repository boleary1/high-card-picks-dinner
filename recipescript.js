var selectedCategory = "breakfast";
var recipeSelection = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + selectedCategory;
var recipeCategories = "https://www.themealdb.com/api/json/v1/1/categories.php";
var mealRecipe = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772";

$.ajax({
    url: recipeCategories, //this Ajax call will display all recipe cattagories the meal db offers
    method: "GET",
})
    .then(function (responseRecipeCategories) {
        // console.log(responseRecipeCategories.categories)
        var a = responseRecipeCategories.categories
        // console.log(a)
        a.forEach(function (entry) {
            console.log(entry.strCategory);
        });
    });

$.ajax({ // this ajax call will display recipes in a selected cattagory
    url: recipeSelection,
    method: "GET",
})
    .then(function (responseRecipeSelection) {
        // console.log(responserecipeSelection)
        var b = responseRecipeSelection.meals
        // console.log(b)
        b.forEach(function (displayoptions) {
            // console.log(displayoptions.idMeal);
            console.log(displayoptions.strMeal);
            // console.log(displayoptions.strMealThumb);

        });

        meal - catagory
    });

$.ajax({
    url: mealRecipe,
    method: "GET",
})
    .then(function (mealDisplay) {
        console.log(mealDisplay)
    });