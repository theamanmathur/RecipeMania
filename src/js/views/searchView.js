/*jshint esversion: 6 */
/*jshint esversion: 8 */

import { elements } from './base';

export const getInput = ()=> elements.searchInput.value;

export const clearInput=() => {
    elements.searchInput.value='';
}
export const clearResults=() => {
        elements.searchResList.innerHTML='';
}

const renderRecipe= recipe=>{
    const rec=recipe.recipe;
    const markup=
                 `<li>
                    <a class="results__link" href="${rec.uri}">
                        <figure class="results__fig">
                            <img src="${rec.image}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${rec.label}</h4>
                            <p class="results__author">${rec.source}</p>
                        </div>
                    </a>
                </li>`;
                elements.searchResList.insertAdjacentHTML('beforeend',markup);
}

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};