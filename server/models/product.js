console.log('product model');

var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 1},
  imageurl: String, 
  quantity: {type: Number, required: true},
  description: String
}, {timestamps: true})

var Product = mongoose.model('Product', ProductSchema);