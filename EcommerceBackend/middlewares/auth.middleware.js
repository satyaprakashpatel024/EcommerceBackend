const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const configs = require('../configs/server.config');

const verifySignupData = async (req, res, next) => {
	try {
		const data = req.body;
		if (!data?.name || !data?.userid || !data?.email || !data?.password) {
			return res.status(400).json({
				message: 'name, userid, email and password are required',
			});
		}
		next();
	} catch (error) {
		console.log('error while validating signup data');
		return res.status(500).json({
			message: 'error while validating signup data',
		});
	}
};

const verifySigninData = async (req, res, next) => {
	try {
		const data = req.body;
		if (!data?.userid || !data?.password) {
			return res.status(400).json({
				message: 'userid and password are required',
			});
		}
		next();
	} catch (error) {
		console.log('error while validating request object');
		return res.status(500).json({
			message: 'error while validating login data',
		});
	}
};

const verifyToken = async (req, res, next) => {
	// step 1: check if token is present or not
	const token = req.headers['x-access-token'];
	if (!token) {
		return res.status(400).json({
			message: 'token is required',
		});
	}
	// if present check if it is valid or not
	jwt.verify(token, configs.ACCESS_TOKEN_SECRET, async (err, decoded) => {
		if (err) {
			return res.status(401).json({
				message: 'Access Denied : unauthorised person',
			});
		}
		/**
		 * find the user in database
		 */
		console.log(decoded);
		const user = await user_model.findOne({ userid: decoded.id });
		/**
		 * if user not find then return error message
		 */
		if (!user) {
			return res.status(400).json({
				message: 'user not found',
			});
		}
		// set the user info into user
		req.user = user;
		// move to next step
		next();
	});
};

const isAdmin = async (req, res, next) => {
	const user = req.user;
	if (user.userType !== 'ADMIN') {
		return res.status(401).json({
			message: 'Access Denied : unauthorised person',
		});
	}
	next();
};

module.exports = {
	verifySignupData,
	verifySigninData,
	verifyToken,
	isAdmin,
};
