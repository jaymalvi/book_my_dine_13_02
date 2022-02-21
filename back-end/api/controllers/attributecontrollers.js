let mongoose = require("mongoose");
const Attribute = require("../models/Attribute");

exports.allAttribute = async (req, res) => {
  try {
    let attribute = await Attribute.find();
    res.status(200).json(attribute);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Attribute.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addAttribute = async (req, res) => {
  try {
    const attribute = new Attribute (req.body);
    const result = await attribute.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteAttribute = async (req, res) => {
  try {
    const id = req.params.attributeId;
    let result = await Attribute.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateAttribute = async (req, res) => {
  try {
    const id = req.params.attributeId;
    let result = await Attribute.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};