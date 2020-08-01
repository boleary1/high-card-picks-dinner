$(document).ready(function() {
    // The div that will hold the populated images, past winners and dates
    const historyContainer = $('div.history');

    // List of objects, to be replaced by real list in memeory, something like:
    // const historyData = JSON.parse(localStorage.getItem('historyKEY'));
    const historyData = [
        {Name:"person1", Date:"day1", APIobj: JSON.stringify({key:'1'})},
        {Name:"person2", Date:"day2", APIobj: JSON.stringify({key:'2'})},
        {Name:"person3", Date:"day3", APIobj: JSON.stringify({key:'3'})},
    ];

    function populateHistory(index) {
        const img = $('<img>').attr('src', 'historyData[index].APIobj.imgindex')
    };

    function getCityID(cityname) {
        const city = cityname;
    }

    $.get('https://developers.zomato.com/api/v2.1/locations?query=portland&count=10&apikey=8fec5b9ec5adee6865da280b88058b07')
        .then(function(response){
            console.log(response);
            console.log(response.location_suggestions[1].city_id); // gets city id, needed for search
            //use to provide dropdown to choose?
        })

    // https://www.w3schools.com/html/html5_geolocation.asp
    var x = document.getElementById("demo");
    let currentLat = "";
    let currentLong = ""

    function getLocation() {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
        }

    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
        currentLat = position.coords.latitude;
        currentLong = position.coords.longitude;
        console.log(position);
    }

    getLocation();
});