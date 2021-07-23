const express=require('express');
const router=express.Router({mergeParams:true});
const{validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const Campground=require('../models/campground');
const Review=require('../models/review');
const reviews=require('../controllers/reviews');
const {campgroundSchema,reviewSchema}=require('../schemas.js');
const ExpressError=require('../helpers/expresserror');
const catchAsync=require('../helpers/catchasync');






router.post('/', isLoggedIn, validateReview, catchAsync(reviews.creatReview))


router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))

module.exports=router;