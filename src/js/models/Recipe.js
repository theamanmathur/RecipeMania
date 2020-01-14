/*jshint esversion: 6 */
/*jshint esversion: 8 */


import axios from 'axios';
import {edamam_app_id,edamam_app_key} from '../config';


export default class Recipe{
    constructor(id){
        this.id=id;
    }

    async getRecipe(){
        try{
            const res=await axios(`https://api.edamam.com/search?r=${this.id}&app_id=${edamam_app_id}&app_key=${edamam_app_key}`);
            this.title=res.data[0].label;
            this.author=res.data[0].source;
            this.img=res.data[0].image;
            this.url=res.data[0].url;
            this.ingredients=res.data[0].ingredients;
            
            //console.log('[Debug-output0]');
            //console.log(res);
            
        }
        catch(e){
            console.log('[Debug-error0]');
            console.log(e);
            //alert('Something went wrong!');
        }
    }
    calcTime(){
        const numIng=this.ingredients.length;
        const periods=Math.ceil(numIng/3);
        this.time=periods*15;
    }
    
    calcServings(){
        this.servings=4;
    }

    parseIng(){

        const unitsLong=['tablespoons','tablespoon','ounce','ounces','teaspoon','teaspoons','cups','pounds'];

        const unitsShort=['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];

        const units=[...unitsShort,'kg','g'];

        const newIngredients=this.ingredients.map(el => {
            el=el.text;
            //console.log(el);
            //uniform units
            let ingredient=el.toLowerCase();
            unitsLong.forEach((unit,i) => {
                ingredient=ingredient.replace(unit,units[i]);
            });
                ingredient=ingredient.replace(/ *\([^)]*\) */g,' ');//Remove parentheses

                const arrIng=ingredient.split(' ');
                const unitIndex=arrIng.findIndex(ele => unitsShort.includes(ele));

                let objIng;

                if(unitIndex > -1){
                    const arrCount=arrIng.slice(0,unitIndex);

                    let count;
                    if(arrCount.length===1){
                        let tempcount=eval(arrIng[0].replace('-','+'));// jshint ignore:line
                        count=Math.round(tempcount*10)/10;
                    }else{
                        let tempcount=eval(arrIng.slice(0,unitIndex).join('+'));// jshint ignore:line
                        count=Math.round(tempcount*10)/10;
                    }
                    objIng={
                        count,
                        unit:arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex+1).join(' ')
                    };
                }else if(parseInt(arrIng[0],10)){
                            objIng={
                                count:parseInt(arrIng[0],10),
                                unit:'',
                                ingredient:arrIng.slice(1).join(' ')
                            };
                    }else if(unitIndex===-1){
                                objIng={
                                    count:1,
                                    unit:'',
                                    ingredient
                                }; 
                }

                //console.log(ingredient);
                return objIng;
            });
        this.ingredients=newIngredients;
    }

    updateServings(type){
        //servings
        const newServings= type==='dec' ? this.servings-1:this.servings+1;

        //ingredients
        this.ingredients.forEach(ing=> {
            ing.count=ing.count*(newServings/this.servings); //unitary method
        });

        this.servings=newServings;
    }

}


//&from=0&to=30