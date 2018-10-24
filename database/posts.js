let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

let postSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  content: String,
  user_id: { ref: 'user', type: ObjectId,required: true}
});

module.exports = mongoose.model('post', postSchema);