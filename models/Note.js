const mongoose = require('mongoose');// mongoose is import
const { Schema } = mongoose;// scema is rule and filed 
//making new schhema like calss and object 
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  // usig mongooe .model() making modal 
  module.exports = mongoose.model('notes', NotesSchema);