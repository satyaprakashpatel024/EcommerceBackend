require('dotenv').config();
const server_config = require('./configs/server.config');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const authRoutes = require('./routers/auth.routes');
const categoryRoutes = require('./routers/category.routes');
const user_model = require('./models/user.model');
app.use(express.json());

mongoose
	.connect(server_config.URL)
	.then((conn) => {
		console.log('connected to database : ', conn?.connections[0]?.name);
		// init();
	})
	.catch((err) => {
		console.log('error while connecting to database', err.message);
	});

async function init() {
	try {
		let user = await user_model.findOne({ userid: 'admin' });
		if (user) {
			console.log('user already exists');
			return;
		}
	} catch (error) {
		console.log('error while fetching from database!');
	}
	try {
		user = await user_model.create({
			name: 'satya',
			userid: 'admin',
			email: 'admin@gmail.com',
			userType: 'ADMIN',
			password: bcrypt.hashSync('123456', 8),
		});
		return;
	} catch (error) {
		console.log('Admin is already present !');
		return;
	}
	return;
}

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use('/ecomm/api/v1/auth', authRoutes);
app.use('/ecomm/api/v1', categoryRoutes);

app.listen(server_config.PORT, () => {
	console.log(`server is runing at http://localhost:${server_config.PORT}`);
});

// always make backend with 3 layers :
// 1. Models
// 2. Controller
// 3. Router
