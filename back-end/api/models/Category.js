let mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now()
  }
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;