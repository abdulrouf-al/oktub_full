const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// to create a model 

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  image: {type:String},
  likes: [
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
],
  user: {
      type: Schema.Types.ObjectId,
      ref: "User"
  },
  username: String,
 
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema); //blog is the collection name without the 's'
// when created automatically will create (from thin name 'Blog')  => a collection called  'blogs' 
// the naming here is "*Important*" 
module.exports = Blog;  // to required it in the main page