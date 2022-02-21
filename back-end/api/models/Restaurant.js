let mongoose = require("mongoose");
let restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  tax: {
    type: String,
    required: false
  },
  charge: {
    type: String,
    required: false
  },
  minimum_delivery_time: {
    type: String,
    required: false
  },
  maximum_delivery_time: {
    type: String,
    required: false
  },
  opening_time: {
    type: String,
    required: false
  },
  closing_time: {
    type: String,
    required: false
  },
  logo: {
    type: String,
    required: false
  },
  food_type: {
    type: String,
    required: false
  },
  latitude: {
    type: String,
    required: false
  },
  longitude: {
    type: String,
    required: false
  },
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  isapproved: {
    type: Boolean,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;