const DeliveryPerson = require("../models/DeliveryPerson");

exports.allDeliveryPerson = async (req, res) => {
  try {
    const result = await DeliveryPerson.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getDeliveryPerson = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await DeliveryPerson.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addDeliveryPerson = async (req, res) => {
  try {
    // const post = new Restaurant({
    //   title: req.body.title,
    //   content: req.body.content,
    //   category: req.body.category,
    //   author: req.body.author
    // });
    console.log(">>>>>>>...", req.body);
    const deliveryperson = new DeliveryPerson(req.body);
    const result = await deliveryperson.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteDeliveryPerson = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    let result = await DeliveryPerson.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDeliveryPerson = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await DeliveryPerson.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};