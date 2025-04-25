const express = require('express');
const { fatchCategories, createCategory } = require('../controller/Category');

const router = express.Router();

//  /categories is already added in base path
router.get('/', fatchCategories).post('/', createCategory);

exports.router = router;