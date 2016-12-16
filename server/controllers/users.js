console.log('users controller');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

function UsersController(){
  this.index = function(req, res){
    User.find({})
    .populate('_items')
    .exec(function(err, users){
      res.json(users);
    })
  };

  this.login = function(req, res){
    console.log(req.params);
    User.findOne({_id: req.params.id}, function(err, user){
      res.json(user);
    })
  };

  this.create = function(req, res){
    console.log("users create: ", req.body);
    var user = new User({
      name: req.body.username,
      _items: [] 
    });
    user.save(function(err, user){
      if(err){
        console.log(err);
        console.log('create method saving user');
      } else {
        console.log('successfully added a user!');        
        console.log(user);
          
        res.json(user);
      }
    })
  };
  this.update = function(req, res){
    var edituser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthday: req.body.birthday
    }
    User.findOneAndUpdate({_id: req.params.id}, edituser, function(err, user){
      res.json(user);
    })

  };
  this.delete = function(req, res){
    console.log("users delete req params ", req.params);
    User.remove({_id: req.params.id}, function(err){
      if(err) {
        console.log('something went wrong. in delete in users.js');
      } else { 
        console.log('successfully removed a user!');
        // res.redirect('/');
        res.end(); 
      }
    })

  };
  this.show = function(req, res){
    console.log(req.params);
    User.findOne({_id: req.params.id}, function(err, user){
      res.json(user);
    })
  };
}
module.exports = new UsersController();