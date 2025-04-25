const express = require('express');
const { createProduct, fetchAllProducts, fatchProductById, updateProduct } = require('../controller/Product');
const router = express.Router();

//  /products is already added in base path
router.post('/', createProduct)
      .get('/', fetchAllProducts)
      .get('/:id', fatchProductById)
      .patch('/:id', updateProduct);

exports.router = router;