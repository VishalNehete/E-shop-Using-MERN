const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
//Fetch data from database
router.get(`/`, async (req,res)=>{
    const productList=await Product.find().populate('category');
    //const productList=await Product.find().select('name image -_id');          //this will show only name and image of product. "-" resembles exclusion of id
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

//fetch particular entry from database
router.get(`/:id`, async (req,res)=>{
    const product=await Product.findById(req.params.id).populate('category');  //because of populate it will show the complete details of category also
    if(!product){
        res.status(500).json({success: false})
    }
    res.send(product);
})


//save data to database
router.post(`/`,async (req,res)=>{

    const category=await Category.findById(req.body.category);                  //this is to check if the user enters invalid category id
    if(!category) 
    return res.status(400).send('Invalid Category');                            //this will throw an error
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

router.put('/:id', async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Object Id');
    }

    const category=await Category.findById(req.body.category);
    if(!category) 
    return res.status(400).send('Invalid Category'); 

    const product=await Product.findByIdAndUpdate(
        req.params.id,
        {
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
        },
        {new :true}
    )
    if(!product)
    return res.status(400).send('The product cannot be updated!');
    
    res.send(product);
})

router.delete('/:id', (req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success:true,message: 'The category is deleted!..'})
        }else{
            return res.status(404).json({success:false, message:'category not found'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

router.get(`/get/count`, async (req,res)=>{
    const productCount=await Product.countDocuments((count) => count)
    if(!productCount){
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req,res)=>{
    const count = req.params.count ? req.params.count : 0
    const products=await Product.find({isFeatured:true}).limit(+count);
    if(!products){
        res.status(500).json({success: false})
    }
    res.send(products);
})

router.get(`/`, async (req,res)=>{

    let filter={};
    if(req.query.categories)
    {
        filter={category:req.query.categories.split(',')}
    }
    const productList=await Product.find(filter).populate('category');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList);
})

module.exports = router;