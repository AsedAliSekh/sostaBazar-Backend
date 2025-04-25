const express = require('express');
const { fatchBrands, createBrand } = require('../controller/Brand');


const router = express.Router();

//  /brands is already added in base path
router.get('/', fatchBrands).post('/', createBrand);

exports.router = router;