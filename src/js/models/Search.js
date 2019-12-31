/*jshint esversion: 6 */
/*jshint esversion: 8 */

import axios from 'axios';

export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
        //const proxy1='http://crossorigin.me/';
        //const proxy2='http://cors-anywhere.herokuapp.com/';
        //const key='5dc7bfd64cc042148428e5d16de09925';
        const edamam_app_id='e98bb11a';
        const edamam_app_key='609b15e8a63582cc432517a5809ca144';
        
        try{
            //console.log(`https://api.edamam.com/search?q=${query}&app_id=${edamam_app_id}&app_key=${edamam_app_key}`);
            //recipePuppy
            //const res=await axios(`http://www.recipepuppy.com/api/?q={query}&p=1`);
            //const res=await axios(`https://api.spoonacular.com/recipes/search?apiKey=${key}&query=${query}&number=1`);

            const res =await axios(`https://api.edamam.com/search?q=${this.query}&app_id=${edamam_app_id}&app_key=${edamam_app_key}&from=0&to=10`);
            console.log(res);

            this.result=res.data.hits; 
            //console.log(this.result);
        }
        catch(e){
            console.log('***'+e.response);
        }
    }
}
