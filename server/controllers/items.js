console.log('items controller');

var mongoose = require('mongoose');
var Item = mongoose.model('Item');

function ItemsController(){
  this.index = function(req, res){
    Item.find({}, function(err, items){
      res.json(items);
    })
  };
  this.create = function(req, res){
    console.log("create item: ", req.body);
    var item = new Item({
      name: req.body.name, 
      description: req.body.description, 
      // imageurl: req.body.imageurl, 
      imageurl: 'http://placehold.it/100x100',
      quantity: req.body.quantity 
    });
    item.save(function(err, item){
      if(err){
        console.log(err);
        console.log('create method saving item');
      } else {
        console.log('successfully added a item!');
        console.log(item);
        res.json(item);
      }
    })
  };
  this.update = function(req, res){
    var edititem = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    Item.findOneAndUpdate({_id: req.params.id}, edititem, function(err, item){
      res.json(item);
    })

  };
  this.delete = function(req, res){
    console.log("items delete req params ", req.params);
    Item.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in items.js');
      } else { 
        console.log('successfully removed a item!');
        res.end(); 
        // res.json({success: true})
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    Item.findOne({_id: req.params.id}, function(err, item){
      res.json(item);
    })
  };
}
module.exports = new ItemsController();