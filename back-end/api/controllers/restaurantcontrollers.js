const Restaurant = require("../models/Restaurant");
const DeliveryPerson = require("../models/DeliveryPerson");


exports.allRestaurant = async (req, res) => {
  try {
    // const isapproved = Boolean(req.params.isapproved);
    // console.log(req.body, req.params, isapproved);
    const result = await Restaurant.find({isapproved: req.params.isapproved});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.dashboard = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const restaurant = await Restaurant.count();
    const deliveryperson = await DeliveryPerson.count();

    res.status(200).json({restaurant,deliveryperson});
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await Restaurant.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addRestaurant = async (req, res) => {
  try {
    // const post = new Restaurant({
    //   title: req.body.title,
    //   content: req.body.content,
    //   category: req.body.category,
    //   author: req.body.author
    // });
    console.log(">>>>>>>...", JSON.parse(req.body.data));

    const restaurant = new Restaurant(JSON.parse(req.body.data));
    const result = await restaurant.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    console.log(req.params);
    const id = req.params.id;
    let result = await Restaurant.remove({ _id: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    let result = await Restaurant.findByIdAndUpdate(id, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};