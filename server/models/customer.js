console.log('customer model');

var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 1}, 
}, {timestamps: true})

var Customer = mongoose.model('Customer', CustomerSchema);