
const dishModel = require('./model');
const findDishById = (id) => {
    let dish = dishModel.findById(id);
    return dish;
};



// mongo db
const insertData = (dish) =>{
    console.log('inserting a data: '+dish.title+' in mongo');
    let tmp = {
        title: dish.title,
        instruction: dish.instruction,
        _id: dish._id,
        ingredients: dish.ingredients
    }
    let data = new dishModel(tmp);

    data.save(function(err, res){
      if(err){
          // data.update(function (err, res){
          //     if(err){
          //         console.log(err);
          //     }
          // })
      }
      else{
          console.log(res);
      }
    })

    return true;
    //return dishModel.create({title: dish.title, instruction: dish.instruction, id: dish.id, ingredients: dish.ingredients})
}

module.exports = {
    findDishById, insertData
}