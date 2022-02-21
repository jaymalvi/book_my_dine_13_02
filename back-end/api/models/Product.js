let mongoose = require("mongoose");
let productSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  tex: {
    type: String,
    required: false
  },
  textype: {
    type: String,
    required: false
  },
  categoryRef: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    required: false 
  }],
  subcategoryRef: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory',
    required: false 
  }],
  attributeRef: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Attribute' 
  }],
  addonRef: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Addon',
    required: false 
  }],
  Image: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;