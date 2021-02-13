const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

//Fetch data from database
router.get(`/`, async (req,res)=>{
    const productList=await Product.find().select('name image -_id');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

//fetch particular entry from database
router.get(`/:id`, async (req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})


//save data to database
router.post(`/`,async (req,res)=>{

    const category=await Category.findById(req.body.category);                //this is to check if the user enters invalid category id
    if(!category) 
    return res.status(400).send('Invalid Category');            //this will throw an error
    let product=new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category:req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews:req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product= await product.save();

    if(!product)
    return res.status(500).send('The product cannot be created');

    res.status(200).send(product);
})

module.exports = router;