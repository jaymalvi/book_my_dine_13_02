let mongoose = require("mongoose");
let attributeSchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Attribute = mongoose.model("Attribute", attributeSchema);
module.exports = Attribute;