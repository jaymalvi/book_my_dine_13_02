let mongoose = require("mongoose");
let deliveryPersonSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  vehicle_number: {
    type: String,
    required: false
  },
  licence_number: {
    type: String,
    required: false
  },
  delivery_person_image: {
    type: String,
    required: false
  },
  licence_image: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  isapproved: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);
module.exports = DeliveryPerson;