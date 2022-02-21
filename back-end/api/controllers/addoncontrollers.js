let mongoose = require("mongoose");
const Addon = require("../models/Addon");

exports.allAddon = async (req, res) => {
  try {
    let addon = await Addon.find();
    res.status(200).json(addon);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAddon = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Addon.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addAddon = async (req, res) => {
  try {
    console.log(">>>>>>>...",req.body);

    const addon = new Addon(req.body);
    const result = await addon.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};


exports.deleteAddon = async (req, res) => {
  try {
    const id = req.params.addonId;
    let result = await Addon.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateAddon = async (req, res) => {
  try {
    const id = req.params.addonId;
    let result = await Addon.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};