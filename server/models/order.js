console.log('orders model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  _customer: {type: Schema.Types.ObjectId, ref: 'Customer'}, 
  _product: {type: Schema.Types.ObjectId, ref: 'Product'},
  customer: {type: String, required: true},
  product: {type: String, required: true},
  quantity: {type: Number, required: true}
}, {timestamps: true})

var Order = mongoose.model('Order', OrderSchema);