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
