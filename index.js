const express = require('express');
const server = express();
const mongoose = require('mongoose');
const { createProduct } = require('./controller/Product');
const productRouters = require('./routes/Products');
const categoriesRouters = require('./routes/Categories');
const brandsRouters = require('./routes/Brands');
const cors = require('cors');


//middlewares
// Add CORS header to all responses.
 server.use((req, res, next) => {
     // Allow requests from http://localhost:3000.
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
     // Allow requests to use the Content-Type header.
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
     next();
   });
server.use(cors({
    exposedHeaders:['X-Total-Count']
}));
server.use(express.json()); //to parse req.body
server.use('/products', productRouters.router);
server.use('/categories', categoriesRouters.router);
server.use('/brands', brandsRouters.router)


main().catch(err=> console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    console.log("database connected")
}
    
// 7:34:12  // 7:47:00  //7:58:00  //8:06:30

server.get('/', (req, res)=>{
    res.json({status: "success"})
})


server.listen(8080, ()=>{
    console.log("server started...")
})