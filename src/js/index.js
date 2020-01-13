/*jshint esversion: 6 */
/*jshint esversion: 8 */

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements,renderLoader,clearLoader } from './views/base';
/** Global state of the app 
 * - search objet
 * - cureent recipe object
 * - Shopping list object
 * - Liked recipes
*/
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch=async ()=>{

    const query = searchView.getInput(); //getting query from the view  
    console.log(query);

    if(query){

        state.search=new Search(query); //creating new Search object and adding it to STATE
        searchView.clearInput(); //preparing UI for results
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try{
            await state.search.getResults(); //searching for recipes
            clearLoader();
            searchView.renderResults(state.search.result); //redndering results on UI 
        }catch(e){
            //alert('something went wrong with search...');
        }
       
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault(); //prevent page reloading
    controlSearch();
});

/**
 * for testing purposes
 */
/*window.addEventListener('load', e => {
    e.preventDefault(); //prevent page reloading
    controlSearch();
});*/

//search.getResults();

elements.searchResPages.addEventListener('click', e => {
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage);
        console.log(goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
/*const encURI=encodeURIComponent('http://www.edamam.com/ontologies/edamam.owl#recipe_1b6dfeaf0988f96b187c7c9bb69a14fa');
console.log(encURI);
const r=new Recipe(encURI);
r.getRecipe();*/

const controlRecipe= async () => {
    //get id from url
   //const id=encodeURIComponent(window.location.hash.replace('#',''));
    const id=window.location.hash.replace('#','');
    console.log('recipe uri: '+id);

    if(id){
        //prepare ui for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //highlight selected
        if(state.search){
            searchView.highlightedSelected(id);
        }
        

        //create new recipe object
        state.recipe=new Recipe(id);
        
        try{
            
            //get recipe data
            await state.recipe.getRecipe();

            //console.log(state.recipe.ingredients);
            state.recipe.parseIng();
            console.log(state.recipe.ingredients);

            //calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            //Render recipe
            //console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        }
        catch(e){
            //alert('error processing recipe!');
            console.log(e);
        }
        
    }
};
//window.addEventListener('hashchange',controlRecipe);
//window.addEventListener('load',controlRecipe);

['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));





































//https://api.spoonacular.com/recipes/search?
//API Key: 5dc7bfd64cc042148428e5d16de09925
//http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3

/*
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
data:
q: "pizza"
from: 0
to: 10
more: true
count: 16098
hits: Array(10)
0:
recipe:
uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_1b6dfeaf0988f96b187c7c9bb69a14fa"
label: "Pizza Dough"
image: "https://www.edamam.com/web-img/284/2849b3eb3b46aa0e682572d48f86d487.jpg"
source: "Lottie + Doof"
url: "http://www.lottieanddoof.com/2010/01/pizza-pulp-fiction-jim-lahey/"
shareAs: "http://www.edamam.com/recipe/pizza-dough-1b6dfeaf0988f96b187c7c9bb69a14fa/pizza"
yield: 4
dietLabels: []
healthLabels: (4) ["Vegetarian", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free"]
cautions: []
ingredientLines: (16) ["500 g bread flour(3 3/4 cups)", "2 1/2 tsp Dry Yeast instant or active (10 grams)", "3/4 tsp Table Salt(5 grams)", "3/4 tsp Sugar, plus a pinch (about 3 grams)", "1 1/2 cup water at room temperature", "extra-virgin olive oil for pans", "2 x yellow onions(medium), finely chopped (pizza cipolla)", "1/3 cup Heavy Cream(pizza cipolla)", "1 tsp Kosher Salt(pizza cipolla)", "2 tsp fresh thyme, coarsely chopped(pizza cipolla)", "7 oz diced tomatoes, drained(pizza pomodoro)", "3/4 cup Canned Tomatoes (reserved juice) (pizza pomodoro)", "2 tsp Extra Virgin Olive Oil(pizza pomodoro)", "1/2 tsp Kosher Salt(pizza pomodoro)", "1 pinch Red Pepper Flakes(pizza pomodoro)", "8 x fresh basil (large leaves), chopped(pizza pomodoro)"]
ingredients: Array(17)
0:
text: "500 g bread flour(3 3/4 cups)"
weight: 513.75
__proto__: Object
1: {text: "2 1/2 tsp Dry Yeast instant or active (10 grams)", weight: 10}
2: {text: "3/4 tsp Table Salt(5 grams)", weight: 5}
3: {text: "3/4 tsp Sugar, plus a pinch (about 3 grams)", weight: 3.1500000000000004}
4: {text: "3/4 tsp Sugar, plus a pinch (about 3 grams)", weight: 3}
5: {text: "1 1/2 cup water at room temperature", weight: 355.5}
6: {text: "extra-virgin olive oil for pans", weight: 21.993052934838357}
7: {text: "2 x yellow onions(medium), finely chopped (pizza cipolla)", weight: 250}
8: {text: "1/3 cup Heavy Cream(pizza cipolla)", weight: 79.33333333333333}
9: {text: "1 tsp Kosher Salt(pizza cipolla)", weight: 4.854166666912875}
10: {text: "2 tsp fresh thyme, coarsely chopped(pizza cipolla)", weight: 1.6}
11: {text: "7 oz diced tomatoes, drained(pizza pomodoro)", weight: 198.44666187500002}
12: {text: "3/4 cup Canned Tomatoes (reserved juice) (pizza pomodoro)", weight: 180}
13: {text: "2 tsp Extra Virgin Olive Oil(pizza pomodoro)", weight: 9}
14: {text: "1/2 tsp Kosher Salt(pizza pomodoro)", weight: 2.4270833334564377}
15: {text: "1 pinch Red Pepper Flakes(pizza pomodoro)", weight: 0.45}
16: {text: "8 x fresh basil (large leaves), chopped(pizza pomodoro)", weight: 0.625}
length: 17
__proto__: Array(0)
calories: 2622.307053843971
totalWeight: 1635.303775760991
totalTime: 0
totalNutrients: {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, FAMS: {…}, FAPU: {…}, …}
totalDaily: {ENERC_KCAL: {…}, FAT: {…}, FASAT: {…}, CHOCDF: {…}, FIBTG: {…}, …}
digest: (26) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
__proto__: Object
bookmarked: false
bought: false
__proto__: Object
1: {recipe: {…}, bookmarked: false, bought: false}
2: {recipe: {…}, bookmarked: false, bought: false}
3: {recipe: {…}, bookmarked: false, bought: false}
4: {recipe: {…}, bookmarked: false, bought: false}
5: {recipe: {…}, bookmarked: false, bought: false}
6: {recipe: {…}, bookmarked: false, bought: false}
7: {recipe: {…}, bookmarked: false, bought: false}
8: {recipe: {…}, bookmarked: false, bought: false}
9: {recipe: {…}, bookmarked: false, bought: false}
length: 10
__proto__: Array(0)
__proto__: Object
status: 200
statusText: "OK"
headers: {cache-control: "private", content-type: "application/json;charset=UTF-8", expires: "Thu, 01 Jan 1970 00:00:00 UTC"}
config: {url: "https://api.edamam.com/search?q=pizza&app_id=e98bb…key=609b15e8a63582cc432517a5809ca144&from=0&to=10", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
__proto__: Object
*/