# High Card Picks Dinner
Relationship saver! Help couples, friends, roommates fairly choose who picks dinner, and find quality dinner choices.

## Table of Contents
1. [Description](#description)
2. [Motivation](#motivation)
3. [Framework Used](#framework-used)
4. [API References](#api-references)
5. [Other Resources](#other-helpful-resources)
6. [Future Development](#future-development)
7. [Credits](#credits)

## Description
With this app, two players will input their name in the player spots. When the DEAL button is clicked,both players will be dealt a card. The high card earns a point and the first person to score 5 points gets to pick dinner. The API *Deck of Cards* is used for this first part of the app.

Once a score of 5 is reached, the users are taken to a search page, where they can search meals by category. The API *The Meal DB* is called to bring up search results. The results include a link to a recipe page or YouTube video so the users can explore the recipes. Once, they decide what they want, they will click the _+_ to make their selection. This will add the selected recipe to their history, along with the name of the person who picked it and the date.

The history and search can be accessed any time with links in the nav bar.

[HIGH CARD PICKS DINNER App](https://tiffany-brand.github.io/high-card-picks-dinner/)

![HCPDscreenshot](https://user-images.githubusercontent.com/61219066/89104773-d144a900-d3e9-11ea-8427-b69330a37233.jpg)

## Motivation
This project was created for the UNH Coding Bootcamp. It was our first group project, where we were tasked with coming up with and designing an application to solve a real-world problem.

__The Problem__
Multiple people are trying to figure out what to have for dinner. This could be friends, roommates, a couple, two random people who meet on the street and happen to be hungry... How can they fairly decide who gets to pick the meal before they get so hangry that they'll never agree on anything again???

__The Solution__
High Card Picks Dinner

With this project, we are also:
* getting experience in Agile development which includes practicing our skills with Git workflow -
** creating and merging branches.
** resolving conflicts as needed.
* utilizing new server-side APIs (The Meal DB and Deck of Cards) and new third-party APIs (Animate.css and Chart.js).
*

## Framework Used

__Built With__
* Materialize

## API References
* [The Meal DB](https://www.themealdb.com/api.php)
* [Deck of Cards](https://deckofcardsapi.com/)
* [Animate.CSS](https://animate.style/)
* [Chart.js](https://www.chartjs.org/docs/latest/)

## Other Helpful Resources
* [Coolors](coolors.co) to help choose color schemes (for the graph)

## Future Development
There are a number of features we would like to implement in the future to improve this app:
1. Add the option to search for restaurants in addition to looking for meal ideas/recipes.
2. Add game options/game rules for the user at the beginning. For example, they can choose to have the winner pick the meal and the loser has to cook it; or if utilizing the restaurant option in the future, the loser could have to buy dinner.
3. Include more search options. For example, rather than just searching by category, users could search by ingredient.
4. The Meal DB is somewhat limited in it's scope of recipes with only 244 meals available and not all of them have recipes. We would explore other recipe APIs that would provide more options. This could also allow us to expand on search options.

## Credits

*

