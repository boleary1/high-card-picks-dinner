const ctx = document.getElementById('past-winners-chart').getContext('2d');

//Creates an array of all the names from the historyData (stored in mem)
let names = [];
historyData.forEach(function(obj) {
    names.push(obj.Name)
});

// Takes an array of the winners, and puts the name of each winner in the object once as well as how many times they've won
function howManyWins(array) {
    let winCounts = {}
    array.forEach(function(name) {
        winCounts[name] = (winCounts[name] || 0) + 1;
    })
}


//Data for chart would come from historyData
// Labels: names, data would be the number of times a name was in the dataHistory
// store in an object
let historyChart = howManyWins(names);  // Format: {name: wins}
console.log(names);
console.log(historyChart);

// Counts how many times an element appears in an array
// function countInArray(array, target) {
//     let count = 0;
//     array.forEach(function(el) {
//         if (el === target) {
//             count++;
//         }
//     });
//     return count;
//     console.log(count);
// }

// Chart settings
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: Object.keys(historyChart),  //['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Wins',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: Object.values(historyChart)   //[0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {}
});