 const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:'dgsqkv8do',
    api_key:'879951332755225',
    api_secret:'NHhdtYJqM7UWCkeyUVoPCPK2CH8'
});
/* cloudinary.config({
    cloud_name:process.env.ClOUDINARY_CLOUD_NAME,
    api_key:process.env.ClOUDINARY_KEY,
    api_secret:process.env.ClOUDINARY_SECRET
}); */


const storage=new CloudinaryStorage({
    cloudinary,
    params: {
    folder:'YELPCAMP',
    allowedFormats:['jpeg','jpg','png']
    }

});

module.exports={
    cloudinary,
    storage
} 

