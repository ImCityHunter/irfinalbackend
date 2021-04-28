
const dishDao = require('../mongoDB/dao');

// start mongod with
// sudo mongod --dbpath /Users/hky/mongod
module.exports = (app) => {
    console.log('getting data from mongo');
    app.get('/dish/:id',(req,res)=>{
        let tmp = req.params['id'];
        let id = parseInt(tmp);
        console.log('getting dish from mongo with id: '+id);
        dishDao.findDishById(id).then(results => {
            console.log('return dish from mongo :'+results);
            return res.json(results)})
    })
}