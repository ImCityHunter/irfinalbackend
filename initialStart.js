
const methods = require('./datasetFunctions/readRecipeDataset');
const readWords =  require('./datasetFunctions/readWords');
const esMethods = require('./elasticSearchFunctions/elasticFunctions');


function start(){

    esMethods.createIndex('dish');
    console.log('Elastic Search Index created');

    try{
        readWords.readMeasurementWords();
        console.log('all measurement has been read');
    }
    catch(e){
        console.log(e);
        console.log('read measurement fails')
    }

    try{
        methods.readData();
    }
    catch(e){
        console.log('read data fail');
    }
}


module.exports = start;