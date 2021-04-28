// https://qbox.io/blog/integrating-elasticsearch-into-node-js-application
'use strict'
const elasticClient = require('../connections/ESconnection');




// create elastic index
function createIndex(index){
    elasticClient.indices.create({
        index: index,
    },function(err,resp,status) {
        if(err) {
            //console.log('err',err);
        }
        else {
            console.log("create",resp);
        }
    });
}




function deleteIndex(index){
    console.log('deleting index:',index);
    elasticClient.indices.delete({index: index},function(err,resp,status) {
        console.log("delete",resp);
    });
}


async function insertData(index, id, type, title, ingredients){
    console.log('inserting: '+title);
    elasticClient.index({
        index: index,
        type: type,
        id: id,
        body: {
            'title': title,
            'ingredients':ingredients
        }
    },function(err,resp,status) {
        if(err){
            console.log('err',err);
        }
        else if (resp){
            console.log(resp);
        }
        else{
            console.log(status);
        }
    });

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


function countIndexType(index, type){
    elasticClient.count({index: index, type:type},function(err,resp,status) {
        console.log("there are these many dishes: ",resp);
        return resp;
    });
}
async function countIndex(index){
    elasticClient.count({index: index},function(err,resp,status) {
        console.log(index, "has this many counts: ",resp);
        return resp;
    });
}
module.exports = {
    searchTitle, searchIngredients, insertData, createIndex, deleteIndex, countIndex
}