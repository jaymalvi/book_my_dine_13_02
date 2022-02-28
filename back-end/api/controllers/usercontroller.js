const User = require("../models/user.model");

const jwt = require("jsonwebtoken");
const Validator = require("validatorjs");
const config = require("../../configs/globle.conf.js");
const bcrypt = require("bcrypt");


const createTokenPromise = (payload, key, options) => {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, key, options, (error, token) => {
			if (error) return reject(error);
			resolve(token);
		});
	});
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await User.findOne({_id: id});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.addUser = async (req, res) => {
  try {
    console.log(">>>>>>>...", req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const UserResult = new User(req.body);
    const result = await UserResult.save();
    
    console.log(">>>>>>> result ", result);

    // return result;
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.POSTRestaurant = async (req, res) => {
	const requestBody = req.body;
	const validationRules = {
		email: "required|email",
		password: "required|min:6",
		owner_name: "required",
		resturant_name: "required",
		address: {
			street: "required",
			landmark: "required",
			area: "required",
			city: "required",
			state: "required",
		},
		phone: "required",
		// location: {
		// 	lat: "required",
		// 	lng: "required",
		// },
		logo: "",
		cover_image: "",
		cuisines: "array|required",
		opening_time: {
			hour: "required|integer",
			minute: "required|integer",
		},
		closing_time: {
			hour: "required|integer",
			minute: "required|integer",
		},
	};

	const validation = new Validator(requestBody, validationRules);
	if (validation.fails()) {
		return res.status(400).json({
			error: "Validation_failed",
			message: validation.errors.all(),
		});
	}

	const user = await User.findOne({ email: requestBody.email });
	if (user) {
		return res.status(400).json({
			error: "Email_already_exists",
			message: "Email already exists",
		});
	}
	const hashedPassword = await bcrypt.hash(requestBody.password, 10);
	const restaurant = await User.create({
		name: requestBody.owner_name,
		email: requestBody.email,
		password: hashedPassword,
		type: "restaurant",
		password_reset_otp: null,
		customer: null,
		// location: {
		// 	type: "Point",
		// 	coordinates: [requestBody.location.lng, requestBody.location.lat],
		// },
		restaurant: {
			name: requestBody.resturant_name,
			address: {
				street: requestBody.address.street,
				landmark: requestBody.address.landmark,
				area: requestBody.address.area,
				city: requestBody.address.city,
				state: requestBody.address.state,
			},
			phone: requestBody.phone,
			logo: requestBody.logo,
			cover_image: requestBody.cover_image,
			cuisines: requestBody.cuisines,
			opening_time: {
				hour: requestBody.opening_time.hour,
				minute: requestBody.opening_time.minute,
			},
			closing_time: {
				hour: requestBody.closing_time.hour,
				minute: requestBody.closing_time.minute,
			},
			is_verified: false,
		},
	});
	res.json({
		message: "Restaurant_created",
		restaurant: restaurant,
	});
};

exports.POSTLogin = async (req, res) => {
	const requestBody = req.body;
	const validationRules = {
		email: "required|email",
		password: "required|min:6",
	};
	const validation = new Validator(requestBody, validationRules);
	if (validation.fails()) {
		return res.status(400).json({
			error: "Validation_failed",
			message: validation.errors.all(),
		});
	}
	const user = await User.findOne({ email: requestBody.email });
	if (!user) {
		return res.status(400).json({
			error: "Email_not_found",
			message: "Email not found",
		});
	}
	const isPasswordValid = await bcrypt.compare(
		requestBody.password,
		user.password
	);
	if (!isPasswordValid) {
		return res.status(400).json({
			error: "Wrong_password",
			message: "Wrong password",
		});
	}
	const token = await createTokenPromise(
		{ user_id: user._id },
		config.JWT_ACCESS_TOKEN_SECRET,
		{
			expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE,
		}
	);
	return res.json({
		message: "User logged in successfully",
		token,
		user,
	});
};
