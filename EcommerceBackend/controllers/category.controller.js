/**
 * controller for creating category
 * post http://localhost:8080/ecomm/api/v1/categories
 */
const category_model = require('../models/category.model');

const createNewCategory = async (req, res) => {
	// read the data
	const data = req.body;
	// create the category object
	const category = {
		name: data?.name,
		description: data?.description,
	};
	// insert into database
	try {
        const categoryObj = await category_model.create(category);
        return res.status(201).json({ message: 'category created successfully', categoryObj });
	} catch (error) {
        console.log('error while creating category', error.message);
        return res.status(500).json({ message: 'error while creating category' });
    }
	// return the response
};

module.exports = {
	createNewCategory,
};
