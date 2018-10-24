let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usersSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  password: String,
  email: String
});

module.exports = mongoose.model('user', usersSchema);