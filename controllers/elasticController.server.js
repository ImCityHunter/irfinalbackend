

const esMethods = require('../elasticSearchFunctions/elasticFunctions');


const bulkMethods = require('../elasticSearchFunctions/elasticBulkInsert');

const tokenization = require('../datasetFunctions/tokenizedIngredients');
/*
* Create controllers to send message for localhost:4200
*/
module.exports = function(app){

    // default, ping test
    app.get('/', function (req, res) {
        let obj = {test:'hello word'};
        res.send(obj);
    })

    // search title
    app.get('/elastic/:index/:query/searchTitle', async function (req, res) {
        const index = await tokenization.tokenizedTitle(req.params.index);
        const query = req.params.query;
        const result = await bulkMethods.searchTitle(index,query);
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    })

    // search ingredient
    app.get('/elastic/:index/:query/searchIngredients', async function (req, res) {
        const index = await tokenization.tokenizedElasticIngredients(req.params.index);
        const query = req.params.query;
        const result = await bulkMethods.searchIngredients(index,query);
        console.log(JSON.stringify(result));
        res.send(JSON.stringify(result));
    })


    // app.get('/:index/:id', async function(req,res){
    //     const index = req.params.index;
    //     const query = req.params.id;  // elastic weird id
    //
    //     const { body } = await client.get({
    //         index: index,
    //         id: query
    //     })
    //
    //     console.log(body);
    //     console.log(body._source.id);
    //
    //
    // })

    app.get('/elastic/:index/count', async function(req,res){
        const index = req.params.index;
        const result = await esMethods.countIndex(index);
        console.log("index "+index+ " has " +result);
        res.send("result is "+result);
    })

    // delete all indexes
    // delete does not work on html
    app.get('/elastic/:index/removeAll', function(req,res){
        const index = req.params.index;
        esMethods.deleteIndex(index);
        let obj = {test:'all deleted'};
        res.send(obj);
    })

    // app.get('/:index/:query/testing', async function (req,res){
    //     const index = req.params.index;
    //     const query = req.params.query;
    //     const { body } = await client.search({
    //         index: index,
    //         // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    //         size: 5,
    //         body: {
    //             query: {
    //                 match: { title: query }
    //             }
    //         }
    //     })
    //
    //     console.log(body.hits.hits)
    // })


}
