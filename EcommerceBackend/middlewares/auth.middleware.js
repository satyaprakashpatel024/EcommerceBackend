const user_model = require('../models/user.model');

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

const verifySigninData = async (req,res,next)=>{
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
}
module.exports = {
    verifySignupData,
	verifySigninData
}