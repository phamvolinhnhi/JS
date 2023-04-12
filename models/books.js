const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  category_Id: {
    type: Number,
    required: true
  },
  author: {
    type: String,
    maxlength: 50
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String,
    maxlength: 50
  },
  view: {
    type: Number
  },
  content: {
    type: String
  },
  description: {
    type: String
  },
  user_name: {
    type: String,
    maxlength: 50
  },
  isFollowing: {
    type: Boolean,
    default: false
  },
  readHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReadHistory'
  }],
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

let Book =mongoose.model("Book",bookSchema);
module.exports={Book};
// module.exports = mongoose.model('Book', bookSchema);
