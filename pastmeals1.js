$(document).ready(function() {
    // The div that will hold the populated images, past winners and dates
    const historyContainer = $('div.history-container');

    const categoryEl = $('#icon_category');
    // const searchEl = $('icon_search');
    const searchBtn = $('button.search');
    const nameEl = $('input#name');

    // array to be used to store the information which will be saves in local storage
    let historyData = [];


    $('select').formSelect(); //From materialize - not sure if i need this.

    // Gets info from local storage and stores it in the historyData variable if there is any available.
    function getHistory() {
        historyData = JSON.parse(localStorage.getItem('historyKEY')) || [{Name:"", Meal: "", Date:"", ImgURL: "", RecipeLink: ""}];
    };

    function populateHistory() {
        console.log(historyData)
        // If history data exists, create a card for each object and add the img, meal name, who picked it, and date
        if (historyData[0].Name) {
            historyData.forEach(function(object){
                const historyDiv = $('<div>').addClass('history col xs12 s6 m4 l2');
                const historyCard = $('<div>').addClass('card');
                const cardImgDiv = $('<div>').addClass('card-img');
               // const aLink = $('<a>').attr('href', object.RecipeLink).attr('target', '_blank');
                const img = $('<img>').attr('src', object.ImgURL).attr('alt', object.Meal).attr('class', 'imgLink').width('100%');
                const textDiv = $('<div>').addClass('history-text card-content');
                const mealName = $('<p>').addClass('meal-name card-title').text(object.Meal);
                const whoPicked = $('<p>').addClass('picked-by').text(`${object.Name} picked on:`);
                const date = $('<p>').addClass('date-picked').text(`${object.Date}`);

                // Wraps the imag in the link... not working... instead, try adding an event listener
                //img.wrap(aLink);
                textDiv.append(mealName, whoPicked, date);
                cardImgDiv.append(img.wrap($(`<a href="${object.RecipeLink}" target="_blank">`))); //this didn't work either
                historyCard.append(cardImgDiv, textDiv);
                historyDiv.append(historyCard);
                historyContainer.append(historyDiv);
                console.log(object.RecipeLink);
            });
        }


    };

    // Stores meal info in local storage
    function saveMeal(name, meal, picURL, recipeLink) {
        const curDate = moment().format('MM/DD/YYYY');
        const newObj = {Name: name, Meal: meal, Date: curDate, ImgURL: picURL, RecipeLink: recipeLink};
        console.log(newObj);
        console.log(historyData[0].Name);
        // If the name in the first history object is blank, set the historyData to the new object; otherwise, ad the new object to the array
        if (!historyData[0].Name) {
            historyData = [newObj];
        } else {
            historyData.push(newObj);
        }

        console.log(historyData);
        localStorage.setItem('historyKEY', JSON.stringify(historyData));
    };

    // Searches the API and calls the saveMeal function on data returned
    function searchCategory(category) {
        // Filter by category
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&apikey=1`)
            .then(function(response){
            console.log(response);

            //Use the meal id to make the call for the meal information (name, recipe link.
            $.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${response.meals[0].idMeal}&apikey=1`)
                .then(function(response){
                    console.log(response);
                    // Parameters: name of user; name of the meal; image of the meal, link to the recipe
                    saveMeal(nameEl.val(), response.meals[0].strMeal, response.meals[0].strMealThumb, response.meals[0].strSource);
                }
            );
        });
    };



    //Get categories:
    // $.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list$apikey=1')
    //     .then(function(response){
    //         console.log(response);
    //         //use to provide dropdown to choose?
    //     })

    // Populates historyData with informations from local storage.
    getHistory();
    populateHistory();

    searchBtn.on("click", function() {
        event.preventDefault();
        console.log(categoryEl.val());
        searchCategory(categoryEl.val());
    });

    // $("img.imgLink").on("click", function() {
    //     console.log($(this).attr('data-index'));
    //     // location.href=
    // });




});