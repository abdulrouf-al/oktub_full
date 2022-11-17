
const express = require('express');
const User = require("../models/User");
const Blog = require("../models/blog");
const moment = require('moment');
const catchAsync = require("././../utils/catchAsync");
const { populate } = require('../models/blog');
const multer = require('multer')
const { storage } = require('../cloudinary/cloudinary');
const upload = multer({ storage })
 
//const parser = multer({ storage: storage });

module.exports.likes_get = async (req, res) => {
  console.log("from likes-get",req.user)
  await Blog.find({ _id: req.user.likes }).sort({ createdAt: -1 })//.populate('title', 'body')
    .then(result => {
      moment.locale('en');
      res.render('favorites', { user: req.user, blogs: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
    });
  //res.render('profile',{user:req.user,blog: result ,moment: moment});
}
module.exports.statistics = async (req, res) => { 
  const blogs = await Blog.find({ user: req.user._id }).sort({ createdAt: -1 })
 // console.log(_id )
  console.log(blogs )
  res.render('statistics', { blogs});
}

module.exports.signup_get = (req, res) => {
  //req.flash('success', 'flash testing signup_get ' );
  res.render('signup');
}

module.exports.settings_put =catchAsync( async(req, res) => {
  const user = await User.findOneAndUpdate({_id:req.user._id},req.body,{ runValidators: true, new: true })//
  //const { username, email, password } = req.body;
  const blogs = await Blog.find({ user: user });
  if (req.file) {
    for (let blog of blogs) {
      blog.userImage = req.file.path;
      blog.save();
    }
    user.image = req.file.path;
    user.save();
  }
  //res.json(req.file);
  req.flash('success', 'updated');
  res.redirect('back');
})

module.exports.settings_get = (req, res) => {

  res.render('settings',{user: req.user})
}


module.exports.profile_get = async (req, res) => {
  const profileUser = await User.findOne({ username: req.params.username})
  const blogs = await Blog.find({ user: profileUser}).sort({ createdAt: -1 })
  moment.locale('en');
  res.render("profile", { profileUser, blogs, moment });
  //res.render('profile',{user:req.user,blog: result ,moment: moment});
}


module.exports.login_get = (req, res) => {
  //req.flash('success', 'flash testing login_get');
  res.render('login');
}

module.exports.signup_post = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({
      email,
      username,
      image: "../public/images/blank-profile-photo.jpeg",

    })
    const newUser = await User.register(user, password);
    req.login(newUser, err => {

      if (err) return next(err);
      req.flash('success', 'welcome');
      req.session.save(function () {  //https://github.com/jaredhanson/passport/issues/306
        return res.redirect('/');
      }
      )
    }); // when user is signing up  is also logged in

  } catch (e) {
    console.log(e.message);
    req.flash('error', e.message);
    res.redirect('/signup');
  }

}

module.exports.login_post = (req, res) => {
  req.flash('success', 'welcome');
  const redirectUrl = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
  //res.redirect('/');
};

/*   passport.authenticate('local',
  {
    failureRedirect: '/login',
    failureFlash: true,
    failureMessage: true,
    successFlash: true,
    //successReturnToOrRedirect: true,
    successRedirect:'/'
   }), 
   (req, res) => {
     
     const redirectUrl = req.session.returnTo || '/';
     req.flash('success', 'welcome');
   res.redirect(redirectUrl); 
  } */


module.exports.logout_get = (req, res) => {
  //res.cookie('jwt', '', { maxAge: 1 });
  /*   req.logout(function (err) {
      if (err) {
        return next(err);
      }
    })
    req.flash('success', 'loggedOut');
    console.log("req.session");
    res.redirect('/homePage'); */
  req.logout(() => {
    req.flash('success', "Goodbye!");
    res.redirect('/')
  });


}
/* 
 */

/* const User = require("../models/User");
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });  
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}




module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
} */