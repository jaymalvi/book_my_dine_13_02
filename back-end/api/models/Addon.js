let mongoose = require("mongoose");
let addonSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Addon = mongoose.model("Addon", addonSchema);
module.exports = Addon;