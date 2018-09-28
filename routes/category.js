const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/CategoryController');

router.get('/:name', CategoryController.categoryId);

module.exports = router;