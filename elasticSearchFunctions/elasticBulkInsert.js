

const elasticClient = require('../connections/ESconnection');




async function bulkInsert(array){
    try{
        const insert = await elasticClient.bulk({body:array});
        console.log(insert);
    } catch(e){
        console.log(e);
    }
}



async function getDishId(index,id){
    let response = {};
    try{
        response = await elasticClient.get({
            index: index,
            id: id
        })
        return response._source.id;
    } catch(e){
        console.log(e);
    }
}


async function searchIngredients(index, query){
    console.log('searching dish for '+query);
    let arr = [];
    let response = {}
    try{
        response =  await elasticClient.search({
            index: index,
            size : 10,
            body: {
                query: {
                    match: {
                        'ingredients':query,
                    },
                },
            }});
        response.hits.hits.forEach(function(hit){
            arr.push(hit._id); // the id here may be awkward because its from bulk insert
        })
    } catch(error){
        console.log("-----there is no match for this query----");
        console.log(error);
        console.log("------------------------------------------");
    }


    return arr;
}


async function searchTitle(index, query){
    console.log("searching for "+query);
    let arr = [];
    let response = {};
    try{
        response =  await elasticClient.search({
            index: index,
            size : 10,
            body: {
                query: {
                    match: {
                        'title':query,
                    },
                },
            }});
        response.hits.hits.forEach(function(hit){
            arr.push(hit._id);
        })
    } catch(error){
        console.log("-----there is no match for this query----");
        console.log(error);
        console.log("------------------------------------------");
    }
    return arr;
}


module.exports={
    bulkInsert, searchTitle, searchIngredients

};