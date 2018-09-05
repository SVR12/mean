var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var posts = new Schema(
  {
    user_email: String,
    user_name: String,
    post: String
  },{
    timestamps: true
  }
)

module.exports = mongoose.model('posts',posts);
