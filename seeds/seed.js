const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64d947bb5191e678054f6fe5',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, consequuntur sed illo pariatur ab voluptate eum! Officiis quae repellat tempore, similique culpa nobis tempora, inventore, perferendis expedita natus ullam quaerat?',
            price,
            geometry: { "type" : "Point", "coordinates" : [ cities[random1000].longitude, cities[random1000].latitude ] },
            images: [
                {
                  url: 'https://res.cloudinary.com/diqhqqd7c/image/upload/v1691982531/YelpCamp/oxzmona5uhjynlrjiuxo.jpg',
                  filename: 'YelpCamp/oxzmona5uhjynlrjiuxo',
                },
                {
                  url: 'https://res.cloudinary.com/diqhqqd7c/image/upload/v1691982531/YelpCamp/znzlq3veewiisjwtioip.png',
                  filename: 'YelpCamp/znzlq3veewiisjwtioip',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});



