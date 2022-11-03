var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
/*   user: {
    firstname: String,
    lastname: String,
    location: String,
    birthday: String,
    email: String,
    image: {type: String, default: "/images/blank-profile.png"},
    bio: String
},
username: String,
passport: String,

type: Schema.Types.ObjectId,
      ref: "User"


 */

  followers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  
  following: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],

  /* email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  following:[String],
  followers:[String] */

},{timestamps:true});

userSchema.plugin(passportLocalMongoose);


const User =  mongoose.model("User", userSchema);

module.exports =User;














/* const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  }
}, { timestamps: true });


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);

module.exports = User; */