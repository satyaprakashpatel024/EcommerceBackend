const bcrypt = require('bcryptjs');
const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
	const data = req.body;
	if (!data?.userid || !data?.email || !data?.password) {
		return res.status(400).json({ message: 'userid, email and password are required' });
	}
	const user = await user_model.findOne({ email: data?.email });
	if (user) {
		return res.status(400).json({ message: 'user is already registered !' });
	}
	const userObj = {
		name: data?.name,
		userid: data?.userid,
		email: data?.email,
		userType: data?.userType,
		password: bcrypt.hashSync(data?.password, 8),
	};
	try {
		const user_created = await user_model.create(userObj);
		const res_obj = {
			name: user_created?.name,
			userid: user_created?.userid,
			email: user_created?.email,
			userType: user_created?.userType,
			createdAt: user_created?.createdAt,
			updatedAt: user_created?.updatedAt,
		};
		return res.status(201).send(res_obj);
	} catch (error) {
		console.log('error occured during creating user !', error);
		return res.status(500).send('error occured during creating user !');
	}
};

const login = async (req, res) => {
	const data = req.body;
	// check if user id is present in the system or not
	const user = await user_model.findOne({ userid: data?.userid });
	if (!user) {
		return res.status(400).json({
			message: 'user not found !!',
		});
	}
	// verify the password
	const isCorrectPassword = await bcrypt.compareSync(data?.password, user?.password);
	if (!isCorrectPassword) {
		return res.status(401).json({
			message: 'wrong password !!!!!',
		});
	}
	user.password = undefined;
	// using jwt token we will create access token with a given time limit and return
	const accessToken = await jwt.sign({ id: user?.userid }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
	return res.status(200).json({
		message: 'login successful',
		data: {
			name:user.name,
			email:user.email,
			userid:user.userid,
			userType:user.userType,
		},
		token: accessToken,
	});
};
module.exports = {
	signup,
	login,
};
