const Campground=require('../models/campground');
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken=process.env.MAPBOX_TOKEN;
const {cloudinary}=require('../cloudinary');


const geocoder=mbxGeocoding({accessToken:mapBoxToken});

module.exports.index=async(req,res)=>{
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
}

module.exports.renderNewForm=(req,res)=>{
    
    res.render('campgrounds/new');
}

module.exports.createCampground=async(req,res,next)=>{
    const geoData=await geocoder.forwardGeocode({
        query:req.body.campground.location,
        limit:1

    }).send()
    
     const campground=new Campground(req.body.campground);
    console.log(campground);
     campground.geometry=geoData.body.features[0].geometry;
    campground.images=req.files.map(f=>({url:f.path, filename:f.filename}));
    campground.author=req.user._id;
    
    await campground.save();
    req.flash('success','you have sucessfully made a campground');
    res.redirect(`/Campground/${campground._id}`); 
    
}

module.exports.showCampground=async(req,res)=>{
   
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
   
    if(!campground){
        req.flash('error','Campground not found');
        res.redirect('/Campground');
    }
    res.render('campgrounds/show',{campground});
}

module.exports.renderEdit=async(req,res)=>{
    const {id}=req.params;
    const campground= await Campground.findById(req.params.id);
    if(!campground){
        req.flash('error','Campground not found');
        res.redirect('/Campground');
    }
    res.render('campgrounds/edit',{campground});

}

module.exports.updateCampground=async(req,res)=>{
    const {id}=req.params;
   
    const campground= await Campground.findByIdAndUpdate(id,{...req.body.campground});
  //  console.log(campground);
    const imgs=req.files.map(f=>({url:f.path, filename:f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if(req.body.deleteImages)
    {
        for(let filename of req.body.deleteImages)
        {
           await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
        console.log(req.body);
    }
    req.flash('success','Successfully updated');
    res.redirect(`/Campground/${campground._id}`);
 
 }


 module.exports.deleteCampground=async(req,res)=>{
    const {id}=req.params;
      await Campground.findByIdAndDelete(id);
      req.flash('success','Sucessfully deleted campground');
      res.redirect('/Campground');
}

