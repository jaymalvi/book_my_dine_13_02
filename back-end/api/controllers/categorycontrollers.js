let mongoose = require("mongoose");
const Category = require("../models/Category");

exports.allCategory = async (req, res) => {
  try {
    let category = await Category.find();
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Category.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addCategory = async (req, res) => {
  try {
    console.log(">>>>>>>...", req.body);

    const category = new Category(req.body);
    const result = await category.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    let result = await Category.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryId;
    let result = await Category.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};