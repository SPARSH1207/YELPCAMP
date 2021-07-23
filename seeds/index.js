const mongoose=require('mongoose');
const cities=require('./citites');
const Campground=require('../models/campground');
const {places,descriptors}=require('./seedHelper');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("database connected");

});
const sample=array=>array[Math.floor(Math.random()*array.length)];
const seedDb=async()=>{
  await  Campground.deleteMany({});
  for(let i=0;i<50;i++)
  {
      const random1000=Math.floor(Math.random()*1000);
      const price=Math.floor(Math.random()*9000)+100;
      const camp=new Campground({
          author:'60e314f40315f92a74c4f477',
          location :`${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
           description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, earum, reprehenderit nihil ullam esse architecto recusandae beatae molestiae ex voluptatem nulla quis possimus numquam ipsum maiores quaerat ab quo eligendi',
           price,
           geometry:{
             type:"Point",
             coordinates:[
               cities[random1000].longitude,
               cities[random1000].latitude,
             ]
           },
           images: [
            {
              url: 'https://res.cloudinary.com/dgsqkv8do/image/upload/v1626114058/YELPCAMP/r1esquacs8gyheft1kfc.jpg',
              filename: 'YELPCAMP/r1esquacs8gyheft1kfc'
            }
          ]

        })
      await camp.save();
  }
}
seedDb().then(()=>{
    mongoose.connection.close();
});