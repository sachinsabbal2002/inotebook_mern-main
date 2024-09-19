const mongoose = require('mongoose');
require('dotenv').config();
// this js file to connect with local mongoosedb mongodb
// hostost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
const mongoURI='mongodb+srv://ashish:12345@cluster0.g45nrog.mongodb.net/inotebookDb';
// const mongoURI="mongodb+srv://admin:<password>@cluster0.smftgib.mongodb.net/"
// call back ek function hota hai jo ki kuch kam karne ke baad return karta hai 
const connectToMongo = async ()=>{
        try{
   await mongoose.connect(mongoURI)
      
        console.log("mogoose is connect")
} catch(error           ){
        console.log("error while connecation with mongodb",error);
}
    
    
} 

module.exports = connectToMongo;