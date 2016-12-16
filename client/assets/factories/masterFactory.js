console.log('Master Factory');

app.factory('usersFactory', ['$http', function($http){
  console.log("usersFactory");
  var users = []; 
  var user = {}; 
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
          user = returned_data.data; 
          users.push(user); 
          console.log(users, user);
          callback(user);
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
          user = data.data; 
          callback(data.data); 
        }
      })
    };

    this.logout = function(callback){
      console.log('usersFactory logout ');
      user = {}; 
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
    this.delete = function(id, callback){
      console.log("id: ", id);
      $http.delete(`/users/${id}`).then(function(data){
        
        console.log("data", data);
        if (typeof(callback) == 'function'){
          callback(data);
        } 
      })
    };
    this.show = function(name, callback){
      $http.get(`/users/${name}`).then(function(data){
        console.log("show data: ", data);
        user = data.data; 
        callback(user); 
      })
    };
    
    this.getUsers = function(callback){
      callback(users);
    };
    this.getUser = function(callback){
      callback(user);
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

    this.update = function(id, edititem, callback){ 
      $http.put(`/items/${id}`, edititem).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };


    this.index = function(callback){
      $http.get('/items').then(function(returned_data){
        console.log(returned_data.data);
        items = returned_data.data;
        callback(items);
      });
   //Note: this can be shortened to $http.get('/items').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    this.delete = function(id, callback){
      console.log("id: ", id);
      $http.delete(`/items/${id}`).then(function(data){

        console.log("data", data);
        if (typeof(callback) == 'function'){
          callback(data);
        } 
      })
    };
    this.show = function(id, callback){
      $http.get(`/items/${id}`).then(function(data){
        console.log("show data: ", data);
        // item = data; 
        callback(data.data); 
      })
    };
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




app.factory('customersFactory', ['$http', function($http){
  var customers = []; 
  var customer = {}; 
  function CustomersFactory(){
    var _this = this;
    this.create = function(newcustomer,callback){
      $http.post('/customers', newcustomer).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.update = function(id, editcustomer, callback){ 
      $http.put(`/customers/${id}`, editcustomer).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };
    this.index = function(callback){
      $http.get('/customers').then(function(returned_data){
        console.log(returned_data.data);
        customers = returned_data.data;
        callback(customers);
      });
   //Note: this can be shortened to $http.get('/customers').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    this.delete = function(id, callback){
      console.log("id: ", id);
      $http.delete(`/customers/${id}`).then(function(data){
        // for (var i = customers.length - 1; i >= 0; i--) {
        //   if(customers[i]._id === id){
        //     customers.splice(i, 1);
        //     break; 
        //   }    
        // };
        console.log("data", data);
        if (typeof(callback) == 'function'){
          callback(data);
        } 
      })
    };
    this.show = function(id, callback){
      $http.get(`/customers/${id}`).then(function(data){
        console.log("show data: ", data);
        // customer = data; 
        callback(data.data); 
      })
    };
    // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getCustomers = function(callback){
      callback(customers);
    };
    this.getCustomer = function(callback){
        callback(customer);
    };
  }
  // console.log(new CustomersFactory());
  return new CustomersFactory();
}])



app.factory('productsFactory', ['$http', function($http){
  var products = []; 
  var product = {}; 
  function ProductsFactory(){
    var _this = this;
    this.create = function(newproduct,callback){
      $http.post('/products', newproduct).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.update = function(id, editproduct, callback){ 
      $http.put(`/products/${id}`, editproduct).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };
    this.index = function(callback){
      $http.get('/products').then(function(returned_data){
        console.log(returned_data.data);
        products = returned_data.data;
        callback(products);
      });
   //Note: this can be shortened to $http.get('/products').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    this.delete = function(id, callback){
      console.log("id: ", id);
      $http.delete(`/products/${id}`).then(function(data){
        // for (var i = products.length - 1; i >= 0; i--) {
        //   if(products[i]._id === id){
        //     products.splice(i, 1);
        //     break; 
        //   }    
        // };
        console.log("data", data);
        if (typeof(callback) == 'function'){
          callback(data);
        } 
      })
    };
    this.show = function(id, callback){
      $http.get(`/products/${id}`).then(function(data){
        console.log("show data: ", data);
        // product = data; 
        callback(data.data); 
      })
    };
    // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getProducts = function(callback){
      callback(products);
    };
    this.getProduct = function(callback){
        callback(product);
    };
  }
  // console.log(new ProductsFactory());
  return new ProductsFactory();
}])




app.factory('ordersFactory', ['$http', function($http){
  var orders = []; 
  var order = {}; 
  function OrdersFactory(){
    var _this = this;
    this.create = function(neworder,callback){
      $http.post('/orders', neworder).then(function(returned_data){
        console.log("returned_data: ", returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.update = function(id, editorder, callback){ 
      $http.put(`/orders/${id}`, editorder).then(function(data){
        console.log(data);
        if (typeof(callback) == 'function'){
          callback(data.data);
        }
      })
    };
    this.index = function(callback){
      $http.get('/orders').then(function(returned_data){
        console.log(returned_data.data);
        orders = returned_data.data;
        callback(orders);
      });
   //Note: this can be shortened to $http.get('/orders').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    this.delete = function(id, callback){
      console.log("id: ", id);
      $http.delete(`/orders/${id}`).then(function(data){
        // for (var i = orders.length - 1; i >= 0; i--) {
        //   if(orders[i]._id === id){
        //     orders.splice(i, 1);
        //     break; 
        //   }    
        // };
        console.log("data", data);
        if (typeof(callback) == 'function'){
          callback(data);
        } 
      })
    };
    this.show = function(id, callback){
      $http.get(`/orders/${id}`).then(function(data){
        console.log("show data: ", data);
        // order = data; 
        callback(data.data); 
      })
    };
    // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getOrders = function(callback){
      callback(orders);
    };
    this.getOrder = function(callback){
        callback(order);
    };
  }
  // console.log(new OrdersFactory());
  return new OrdersFactory();
}])