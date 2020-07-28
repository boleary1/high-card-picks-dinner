$(document).ready(function() {
    // The div that will hold the populated images, past winners and dates
    const historyContainer = $('div.history-container');

    const categoryEl = $('#icon_category');
    // const searchEl = $('icon_search');
    const searchBtn = $('button.search');
    const nameEl = $('input#name')

    // array to be used to store the information which will be saves in local storage
    let historyData = [];


    $('select').formSelect(); //From materialize - not sure if i need this.

    // Gets info from local storage and stores it in the historyData variable.
    function getHistory() {
        historyData = JSON.parse(localStorage.getItem('historyKEY')); //|| [{Name:"No History", Date:"day", APIobj: "No history yet"}];
    };

    function populateHistory() {
        console.log(historyData)
        historyData.forEach(function(object){
            const historyDiv = $('<div>').addClass('history col xs12 s6 m4 l2');
            const historyCard = $('<div>').addClass('card');
            const cardImgDiv = $('<div>').addClass('card-img');
            const img = $('<img>').attr('src', object.ImgURL).attr('alt', object.Meal).width('100%');
            const textDiv = $('<div>').addClass('history-text card-content');
            const mealName = $('<p>').addClass('meal-name card-title').text(object.Meal);
            const whoPicked = $('<p>').addClass('picked-by').text(`${object.Name} picked on:`);
            const date = $('<p>').addClass('date-picked').text(`${object.Date}`);

            textDiv.append(mealName, whoPicked, date);
            cardImgDiv.append(img);
            historyCard.append(cardImgDiv, textDiv);
            historyDiv.append(historyCard);
            historyContainer.append(historyDiv);
        });

    };

    // Stores meal info in local storage
    function saveMeal(name, meal, picURL) {
        const curDate = moment().format('MM/DD/YYYY');
        const newObj = {Name: name, Meal: meal, Date: curDate, ImgURL: picURL};
        console.log(newObj);
        historyData.push(newObj);
        console.log(historyData);
        localStorage.setItem('historyKEY', JSON.stringify(historyData));
    };

    // Searches the API and calls the saveMeal function on data returned
    function searchCategory(category) {
        // Filter by category
        $.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}&apikey=1`)
        .then(function(response){
            console.log(response);
            console.log(response.meals[0].strMeal);
            console.log(response.meals[0].strMealThumb); //URl for thumbnail
            saveMeal(nameEl.val(), response.meals[0].strMeal, response.meals[0].strMealThumb);
        });
    }



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

    })




});