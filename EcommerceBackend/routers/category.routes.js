/**
 * http://localhost:8080/ecomm/api/v1/categories
 *
 */
const express = require('express');
const router = express.Router();
const { createNewCategory } = require('../controllers/category.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

router.post('/categories', [verifyToken, isAdmin], createNewCategory);

module.exports = router;
