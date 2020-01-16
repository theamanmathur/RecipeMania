/*jshint esversion: 6 */
/*jshint esversion: 8 */

import axios from 'axios';
import {edamam_app_id,edamam_app_key,proxy1,proxy2} from '../config';
export default class Search{
    constructor(query){
        this.query=query;
    }

    async getResults(){
    
        try{
            const res =await axios(`${proxy2}https://api.edamam.com/search?q=${this.query}&app_id=${edamam_app_id}&app_key=${edamam_app_key}&from=0&to=30`);
            //console.log(res);

            this.result=res.data.hits; 
            //console.log(this.result);
        }
        catch(e){
            console.log('***'+e.response);
        }
    }
}
