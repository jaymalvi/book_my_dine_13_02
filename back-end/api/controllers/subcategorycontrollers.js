let mongoose = require("mongoose");
const SubCategory = require("../models/SubCategory");

exports.allSubCategory = async (req, res) => {
  try {
    let subcategory = await SubCategory.find()
    .populate({path:'categoryRef'})
    .exec();
    console.log(subcategory);
    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.subCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    let subcategory = await SubCategory.find({categoryRef: id})
    .populate({path:'categoryRef'})
    .exec();
    console.log(subcategory);
    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await SubCategory.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    console.log(">>>>>>>...");

    const subcategory = new SubCategory(req.body);
    const result = await subcategory.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.subcategoryId;
    let result = await SubCategory.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params.subcategoryId;
    let result = await SubCategory.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};