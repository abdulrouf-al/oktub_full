const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var slug = require('mongoose-slug-generator')

// to create a model 
mongoose.plugin(slug);
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
  //slug: { type: "String", slug: "title", unique: true }
  slug: { type: String, slug: "title", unique: true },
  seenUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User"
}],
  seenCounter: Number
 
}, { timestamps: true });

blogSchema.pre("save", function(next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

const Blog = mongoose.model('Blog', blogSchema); //blog is the collection name without the 's'
// when created automatically will create (from thin name 'Blog')  => a collection called  'blogs' 
// the naming here is "*Important*" 
module.exports = Blog;  // to required it in the main page