


const tokenizationAssist = require('./tokenizationAssist');
const pluralize = require('pluralize');
const Global_Variables = require('../Variables/Global_Variables');

const stemmer = import('stemmer')
// expect an array/object of ingredients
function tokenizedIngredient (ingredient) {
    let newStr = "";
    ingredient = ingredient.toLowerCase().replace("advertisement",'');
    ingredient = ingredient.replace(/[\/\-:\.\*®™]/g,'') // punctuation marks
    ingredient = ingredient.replace(/[0-9]/g,'').trim();// remove digits
    if(ingredient!= undefined && Global_Variables.measurementWords.length > 10
        && ingredient.length>0){
        let arr = ingredient.split(' ');
        for(let word of arr){
            word = singularize(word);
            //word = stemmer(word);
            if(!Global_Variables.measurementWords.includes(word)){
                newStr = newStr + " " + word;
            }
        }
    }
    return newStr;
}

function singularize(word){
    if(pluralize.isPlural(word)){
        word = pluralize.singular(word);
    }
    return word;
}


function tokenizedElasticIngredients(text){
    const arr = text.split(',');
    let query = "";
    for (let item of arr){
        if(query.length==0){
            query = item;
        }
        else{
            query = query + 'AND' + item;
        }
    }
    return arr;
}

function tokenizedTitle (text) {
    try {
        text = text.toLowerCase();
        text =  tokenizationAssist.removeParenthesisText(text);
        let strSplit = text.split(' ');
        let result = "";
        for(let word of strSplit){
            word =  singularize(word);
            //word = stemmer(word);
            result = result + " " + word;
        }
        return result;
    }
    catch(e){
        console.log(e);
        console.log("async error");
    }

}

function ingredientsForElasticSearch(originIngredients){
    try{
        let text = "";
        for (const key in originIngredients){
            let ingredient = originIngredients[key];
            ingredient = ingredient.toLowerCase().replace("advertisement",'');
            if(text.length == 0 && ingredient.length > 0){
                text = ingredient;
            }
            else if(ingredient.length > 0){
                text = text + " AND " + ingredient;
            }
        }
        return text.trim();
    }
    catch(e){
        console.log(e);
        console.log("async error");
    }

}

function ingredientsForCustomizedSearch (originIngredients) {

    try{
        let ingredients = [];
        for (const key in originIngredients){
            let ingredient = originIngredients[key];
            ingredient =  tokenizationAssist.removeParenthesisText(ingredient);
            ingredient =  ingredient.toLowerCase().replace("advertisement",''); // remove advertisement string
            ingredient =  tokenizationAssist.removeAllAfter(ingredient," or ");
            ingredient =  tokenizationAssist.removeAllAfter(ingredient," to ");
            ingredient =  tokenizationAssist.removeAllAfter(ingredient,"\,");
            ingredient =  tokenizedIngredient(ingredient);
            if(ingredient.length>0){
                ingredients.push(ingredient);
            }
        }
        return ingredients;
    }
    catch(e){
        console.log(e);
    }
}




module.exports = {
    ingredientsForElasticSearch, ingredientsForCustomizedSearch, tokenizedTitle, tokenizedElasticIngredients
}