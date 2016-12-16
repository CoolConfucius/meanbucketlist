console.log("masterController");

var app = angular.module('app');

app.controller('navController', ['$scope', '$location', 'usersFactory', function($scope, $location, usersFactory){
  console.log("navController");
  $scope.currentuser = {};

  $scope.logout = function(){
    console.log("Logged out!");
    // alert("logged out!");
    $location.url('/');
  }
}])


app.controller('enterController', ['$scope', '$location', 'usersFactory', function($scope, $location, usersFactory){
  console.log("enterController");
  $scope.username = '';

  $scope.login = function(){

    usersFactory.login($scope.username, function(data){
      console.log('login data', data);
      if (!data) {
        console.log("False login data");
        console.log("create new user!");
        usersFactory.create($scope.username, function(data){
          $location.url('/');  
        })



      } else if (true) {
        // $location.url('/dashboard');
        $location.url('/');
      };
    })
  }



  $scope.newcustomer = {};
  $scope.customers = [];

  // customersFactory.index(function(data){
  //   $scope.customers = data; 
  // })
  $scope.addcustomer = function(){
    console.log("addcustomer");
    customersFactory.create($scope.newcustomer, function(newcustomer){
      $scope.customers.push(newcustomer);
      $scope.newcustomer = {}
    })
  }

}])

app.controller('customersController', ['$scope', '$location', 'customersFactory', function($scope, $location, customersFactory){
  console.log("customersController");
  $scope.newcustomer = {};
  $scope.customers = [];

  customersFactory.index(function(data){
    $scope.customers = data; 
  })
  $scope.addcustomer = function(){
    console.log("addcustomer");
    customersFactory.create($scope.newcustomer, function(newcustomer){
      $scope.customers.push(newcustomer);
      $scope.newcustomer = {}
    })
  }

  $scope.removecustomer = function(index){
    console.log($scope.customers[index]);
    var id = $scope.customers[index]._id; 
    customersFactory.delete(id, function(){
      $scope.customers.splice(index, 1);
      // $scope.customers = data; 
    })
  }

}])


app.controller('productsController', ['$scope', '$location', 'productsFactory', function($scope, $location, productsFactory){
  console.log("productsController");
  $scope.newproduct = {};
  $scope.products = [];

  productsFactory.index(function(data){
    $scope.products = data; 
  })
  $scope.addproduct = function(){
    console.log("addproduct");
    productsFactory.create($scope.newproduct, function(newproduct){
      $scope.products.push(newproduct);
      $scope.newproduct = {};
    })
  }

  $scope.removeproduct = function(index){
    console.log($scope.products[index]);
    var id = $scope.products[index]._id; 
    productsFactory.delete(id, function(){
      $scope.products.splice(index, 1);
      // $scope.products = data; 
    })
  }

  $scope.disableFilter = true; 
  $scope.filtertoggle = function(){
    $scope.disableFilter = !$scope.disableFilter; 
  }
}])

app.controller('ordersController', ['$scope', '$location', 'customersFactory', 'productsFactory', 'ordersFactory', function($scope, $location, customersFactory, productsFactory, ordersFactory){
  console.log("ordersController");
  $scope.customers = [];
  $scope.products = []; 
  customersFactory.index(function(data){
    $scope.customers = data; 
  })
  productsFactory.index(function(data){
    $scope.products = data; 
    $scope.currentproduct = data[0]; 
  })

  $scope.orders = []; 

  ordersFactory.index(function(data){
    $scope.orders = data; 
  })

  $scope.currentmax; 
  $scope.change = function(index){
    console.log($scope.neworder.product);
    for (var i = $scope.products.length - 1; i >= 0; i--) {
      if ($scope.products[i]._id === $scope.neworder.product) {
        $scope.currentmax = $scope.products[i].quantity;
        console.log($scope.currentmax);
        return;
      }
    };
  }

  $scope.scope = function(){
    console.log();
  }

  $scope.addorder = function(){
    console.log("addorder ", $scope.neworder);
    ordersFactory.create($scope.neworder, function(neworder){
      $scope.orders.push(neworder);
      $scope.neworder = {};
    })
  }  

}])



app.controller('dashboardController', ['$scope', '$location', 'customersFactory', 'productsFactory', 'ordersFactory', function($scope, $location, customersFactory, productsFactory, ordersFactory){
  console.log("dashboardController");
  $scope.customers = [];
  $scope.products = []; 
  $scope.orders = []; 
  
  customersFactory.index(function(data){
    $scope.customers = data; 
  })
  productsFactory.index(function(data){
    $scope.products = data; 
  })
  ordersFactory.index(function(data){
    $scope.orders = data; 
  })

}])
