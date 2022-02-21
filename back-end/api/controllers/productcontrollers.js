let mongoose = require("mongoose");
const Product = require("../models/Product");

exports.allProduct = async (req, res) => {
  try {
    let product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Product.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addProduct = async (req, res) => {
  try {
    console.log(">>>>>>>...",req.body);

    const product = new Product(req.body);
    const result = await product.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    let result = await Product.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    let result = await Product.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};