const mongoose = require('mongoose');
const { Schema } = mongoose;
// create user object/modal
// UserSchema is object name , new Schema is intiall a object taking argument as constructor 
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  // mongose.modal(modalName,Shema)  it make a model from give schema 
  const User = mongoose.model('user', UserSchema);
  // here User is model which is expoerted
  module.exports = User;