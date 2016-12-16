console.log('future routes');
var users = require('./../controllers/users.js');
var items = require('./../controllers/items.js');

// var customers = require('./../controllers/customers.js');
// var products = require('./../controllers/products.js');
// var orders = require('./../controllers/orders.js');

module.exports = function(app){

  app.get('/users', users.index)
  app.get('/login/:name', users.login)
  // app.get('/users/find/:name', users.findOne)
  app.get('/users/:name', users.show)
  // app.get('/users/:id', users.show)
  app.post('/users', users.create)
  app.put('/users/:id', users.update)
  app.delete('/users/:id', users.delete)


  app.get('/items', items.index)
  app.get('/items/:id', items.show)
  app.post('/items', items.create)
  app.put('/items/:id', items.update)
  app.delete('/items/:id', items.delete)


  // app.get('/customers', customers.index)
  // app.get('/customers/:id', customers.show)
  // app.post('/customers', customers.create)
  // app.put('/customers/:id', customers.update)
  // app.delete('/customers/:id', customers.delete)

  // app.get('/products', products.index)
  // app.get('/products/:id', products.show)
  // app.post('/products', products.create)
  // app.put('/products/:id', products.update)
  // app.delete('/products/:id', products.delete)

  // app.get('/orders', orders.index)
  // app.get('/orders/:id', orders.show)
  // app.post('/orders', orders.create)
  // app.put('/orders/:id', orders.update)
  // app.delete('/orders/:id', orders.delete)

  // app.get('/url', function(req, res) {
  //   console.log('REACHED /url ROUTE');
  //   model.method(req, res);
  // })
}