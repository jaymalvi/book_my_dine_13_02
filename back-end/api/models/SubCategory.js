let mongoose = require("mongoose");
let subcategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  categoryRef: [{
       type: mongoose.Schema.Types.ObjectId, ref: 'Category' 
  }],
  created: {
    type: Date,
    default: Date.now()
  }
});
const SubCategory = mongoose.model("SubCategory", subcategorySchema);
module.exports = SubCategory;