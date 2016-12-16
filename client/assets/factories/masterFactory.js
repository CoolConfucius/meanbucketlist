console.log('Master Factory');

app.factory('usersFactory', ['$http', function($http){
  console.log("usersFactory");
  var users = []; 
  var loggedinuser = {}; 

  function UsersFactory(){
    // var _this = this;
    // this.create = function(newuser,callback){
    //   console.log("factory creating user");
    //   $http.post('/users', newuser).then(function(returned_data){
    //     console.log("returned_data: ", returned_data.data);
    //     if (typeof(callback) == 'function'){
    //       user = returned_data.data; 
    //       users.push(user); 
    //       callback(user);
    //     }
    //   });
    // };
    function register(newuser, callback){
      console.log("factory registering user");
      $http.post('/users', newuser).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          loggedinuser = returned_data.data; 
          users.push(loggedinuser); 
          console.log(users, loggedinuser);
          callback(loggedinuser);
        }
      });
    }

    this.login = function(name, callback){
      console.log('usersFactory login, ', name);
      $http.get(`/login/${name}`).then(function(data){
        console.log("login data: ", data);
        if (data.data.nouser) {
          console.log("No existing user, so create one");
          register({name: name}, callback);
        } else {
          loggedinuser = data.data; 
          callback(data.data); 
        }
      })
    };

    this.logout = function(callback){
      console.log('usersFactory logout ');
      loggedinuser = {}; 
      callback();
    };


    // this.update = function(id, edituser, callback){ 
    //   $http.put(`/users/${id}`, edituser).then(function(data){
    //     console.log(data);
    //     if (typeof(callback) == 'function'){
    //       callback(data.data);
    //     }
    //   })
    // };
    this.index = function(callback){
      $http.get('/users').then(function(returned_data){
        console.log(returned_data.data);
        users = returned_data.data;
        callback(users);
      });
   //Note: this can be shortened to $http.get('/users').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    // this.delete = function(id, callback){
    //   console.log("id: ", id);
    //   $http.delete(`/users/${id}`).then(function(data){
        
    //     console.log("data", data);
    //     if (typeof(callback) == 'function'){
    //       callback(data);
    //     } 
    //   })
    // };
    this.show = function(name, callback){
      $http.get(`/users/${name}`).then(function(data){
        console.log("show data: ", data);
        var profileuser = data.data; 
        callback(profileuser); 
      })
    };
    
    this.getUsers = function(callback){
      callback(users);
    };
    this.getUser = function(callback){
      callback(loggedinuser);
    };
  }

  return new UsersFactory();
}])

app.factory('itemsFactory', ['$http', function($http){
  var items = []; 
  var item = {}; 
  function ItemsFactory(){
    var _this = this;
    this.create = function(newitem,callback){
      $http.post('/items', newitem).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };

    this.toggle = function(id, callback){ 
      $http.put(`/items/${id}`).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };

    // this.update = function(id, edititem, callback){ 
    //   $http.put(`/items/${id}`, edititem).then(function(data){
    //     console.log(data);
    //     if (typeof(callback) == 'function'){
    //       callback(data.data);
    //     }
    //   })
    // };


    this.index = function(callback){
      console.log("items factory index method");
      $http.get('/items').then(function(returned_data){
        console.log("items factory get items: ", returned_data.data);
        items = returned_data.data;
        callback(items);
      });
   //Note: this can be shortened to $http.get('/items').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    // this.delete = function(id, callback){
    //   console.log("id: ", id);
    //   $http.delete(`/items/${id}`).then(function(data){

    //     console.log("data", data);
    //     if (typeof(callback) == 'function'){
    //       callback(data);
    //     } 
    //   })
    // };
    // this.show = function(id, callback){
    //   $http.get(`/items/${id}`).then(function(data){
    //     console.log("show data: ", data);
    //     // item = data; 
    //     callback(data.data); 
    //   })
    // };
    // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getItems = function(callback){
      callback(items);
    };
    this.getItem = function(callback){
        callback(item);
    };
  }
  // console.log(new ItemsFactory());
  return new ItemsFactory();
}])


