const express=require('express');
const router=express.Router();
const campgrounds=require('../controllers/campgrounds');
const {campgroundSchema}=require('../schemas.js');
const catchAsync=require('../helpers/catchasync');
const ExpressError=require('../helpers/expresserror');
const {isLoggedIn,validateCampground,isAuthor}=require('../middleware');

const multer=require('multer');
const {storage}=require('../cloudinary');
const upload=multer({storage});

const Campground=require('../models/campground');



router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground));
    
    


    router.get('/new',isLoggedIn,campgrounds.renderNewForm);
    
    router.route('/:id')
          .get( isLoggedIn,catchAsync(campgrounds.showCampground))
          .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))
          .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.updateCampground))
         
 router.get('/:id/edit',isLoggedIn, isAuthor,catchAsync(campgrounds.renderEdit));


    









module.exports=router;