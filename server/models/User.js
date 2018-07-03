let mongoose = require('mongoose');


mongoose.model('User', new mongoose.Schema({

  email:{type: String, required: true},
  password:{type: String, required: true},
  answerTypes:{type: Array}
  

},{timestamps:true}));