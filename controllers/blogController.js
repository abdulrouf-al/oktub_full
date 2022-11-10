const Blog = require('../models/blog');
const passport = require("passport");
const mongoose = require('mongoose');
const User = require('../models/User');
const moment = require('moment'); // require 21/09/2022
moment.locale('en');
//  console.log(moment('2022-09-25T17:22:44.889+00:00').format('DD/MM/YYYY'));
//   console.log(moment('2022-09-25T17:22:44.889+00:00').fromNow());




//blogs
const blog_index = async (req, res) => {
  await Blog.find({}).sort({ createdAt: -1 })//.populate('user', 'username')
    .then(result => {
      moment.locale('ar');
      res.render('blogs', { blogs: result, moment });
    })
    .catch(err => {
      console.log(err);
    });
}


/* const blog_myblogs = async (req, res) => {
  await Blog.find({userID:req.user._id}).sort({ createdAt: -1 }).populate('user', 'username')
      .then(result => {
        moment.locale('ar');
        res.render('blogs', { blogs: result,moment });
      })
      .catch(err => {
        console.log(err);
      });
   const myBlogs = [{}];
  await Blog.find({user:req.user})//.sort({ createdAt: -1 })
    //.populate('user', 'username')//.exec().user:req.user
      .then(result => {
        console.log(Blog.user, '**********', req.user,)
        moment.locale('ar');
        res.render('myblogs', { blogs: result, moment });
      })
      .catch(err => {
        console.log(err);
      }); 
  
}; */

//blogs/id
const blog_details = async (req, res) => {
  const id = req.params.id;
  //const blog = await Blog.findById(id).populate('user');//.populate('user') &&  Blog.comments.push(comment);
  await Blog.findById(id)
    .then(result => {
      moment.locale('en');
      res.render('details', { blog: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}
//blogs/create
const blog_create_get = (req, res) => {
  res.render('create');
}
//post
const blog_create_post = async (req, res) => {
  //const user = new mongoose.Types.ObjectId();
  // const blog = new Blog(req.body,user );

  const blog = new Blog({
    title: req.body.title,
    body: req.body.body,
    user: req.user._id,
    username: req.user.username,
  });

  await blog.save()
    .then(result => {
      req.flash('success', 'Your blog has been created');
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
  const user1 = await User.findById(req.user._id);
  await user1.blogs.push(blog);
  await user1.save();
}
//edit

//blog_edit
const blog_edit = async (req, res, next) => {

  const id = req.params.id;
  const blog = await Blog.findById(id)
    .then(result => {
      res.render('edit', { blog: result, });

    }).catch(err => {
      return next(err);
      if (!blog) {        //return next(new AppError('page not found', 404));
        console.log(err);
        req.flash('error', err.message || 'Oops! something went wrong.');
        res.status(500).redirect('back');
      }
    })
};

/* app.put('/blogs/:id', 
 */  const blog_update = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })//...req.body.result
    .then(result => {
      res.redirect(`/blogs/${ result.id }`)//      res.redirect(`/blogs/${blog.id}`);

    }).catch(err => {
      console.log(err);
    });
};



/* 
try {
}
catch (err) {
  next(err);  //will fire 'app.use((err, req, res, next) => {' from the app.js
}

*/
const blog_follow_username = async (req, res) => {
  //const blog = await user.findById(req.params.id);
  const user = await User.findByUsername(req.params.username);
  if (!user.followers.includes(req.user._id)) {
    user.followers.push(req.user._id);
    req.user.following.push(user);
    await user.save();
    await req.user.save();
    req.flash('success', 'Followed');
    console.log('followed');
  }
  else {
    user.followers.pop(req.user._id);
    req.user.following.pop(user);
    await user.save();
    await req.user.save();
    req.flash('success', 'unFollowed');
    console.log('unFollow');
  }
  res.redirect('back');
};

const blog_follow = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const user = await User.findById(blog.user);
  /* if (blog.user == req.user._id) {
    console.log('cant follow your self');
    req.flash('error', 'cant follow your self');
    return res.redirect('back');
  } */
 if ( user.followers.length==0 || !user.followers.includes(req.user._id)) {
    user.followers.push(req.user._id);
    req.user.following.push(user);
    await user.save();
    await req.user.save();
    req.flash('success', 'Followed');
    console.log('followed');
  }
  else {
    user.followers.pop(req.user._id);
    req.user.following.pop(user);
    await user.save();
    await req.user.save();
    req.flash('success', 'unFollowed');
    console.log('unFollow');
 }
  res.redirect('back');
};
const blog_like = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const user = await User.findById(blog.user);
  
  if (!blog.likes.includes(req.user._id)) {
    blog.likes.push(req.user._id);
    req.user.likes.push(blog);
    await blog.save();
    await req.user.save();
    console.log('like');
  }
  else {
    blog.likes.pop(req.user._id);
    req.user.likes.pop(blog);
    await blog.save();
    await req.user.save();
    console.log('unlike');
  }
  res.redirect('back');
};

//delete
const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit,
  blog_update,
  //blog_myblogs,
  blog_follow,
  blog_follow_username,
  blog_like

}