const { Product } = require("../model/Product")

exports.createProduct = async (req, res) => {
  // this product we have to get from API body
  const product = new Product(req.body)
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err)
  }

}

// fatch all products API
exports.fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : we have to try with multiple category and brands after change in front-end
  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  // Filtering
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  // sorting
  //TODO : How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  // total count
  const totalDocs = await totalProductsQuery.countDocuments().exec();
  console.log({ totalDocs });

  //pagination
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};


// fatch product by id
exports.fatchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Product.findById(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
}

// update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
}