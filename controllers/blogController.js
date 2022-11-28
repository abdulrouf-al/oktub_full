const Blog = require('../models/blog');
const passport = require("passport");
const mongoose = require('mongoose');
const User = require('../models/User');
const moment = require('moment'); // require 21/09/2022
moment.locale('en');
//  console.log(moment('2022-09-25T17:22:44.889+00:00').format('DD/MM/YYYY'));
//   console.log(moment('2022-09-25T17:22:44.889+00:00').fromNow());

const catchAsync = require("././../utils/catchAsync");

const blog_mostSeen = catchAsync(async (req, res) => {
  const blog = await Blog.find({}).sort({ seenCounter: -1 })//.populate('user', 'username') .then(result => {
  /*   var users = [];
    var user;
    blog.forEach(blog => {
      users.push( User.findByUsername(blog.username));
      console.log(User.findByUsername(blog.username))
    }); */
  //console.log(users)
  // console.log(users[0].image)
  moment.locale('en');
  //console.log(result)
  res.render('mostseen', { blogs: blog, moment });
})

//blogs
const blog_index = catchAsync(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 })//.populate('user', 'username') .then(result => {
  /* for (let blog of blogs) {
    image = await User.findByUsername(blog.username);
    blog.userImage = image.image;
    console.log(blog.userImage)
  };  */

  moment.locale('en');
  res.render('blogs', { blogs: blogs, moment });
})
/* .catch(err => {
  console.log(err);
}); }) */



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
/* const blog_details = catchAsync(async (req, res) => {
  //const blog = await Blog.findById(id).populate('user');//.populate('user') &&  Blog.comments.push(comment);
  await Blog.find({ slug: req.params.slug })
    .then(result => {
      moment.locale('en');
      const blogUser = User.findById(result.user)
      res.render('details', { blogUser, blog: result, moment: moment });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}) */
//blogs/create
const blog_create_get = (req, res) => {
  res.render('create');
}

var QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;

const { convertDeltaToHtml  } = require('node-quill-converter');
/* const Quill = require("quill");
var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'
}); */
//post
const blog_create_post = catchAsync(async (req, res) => {
  
 
  var cfg = {};
  const decoded = JSON.parse(decodeURIComponent(req.body.body));
  var converter = new QuillDeltaToHtmlConverter(decoded.ops);
  
  let delta = convertDeltaToHtml(decoded);
  var html = converter.convert();
  console.log(req.body.body)
  console.log("****************************")
  console.log(converter)
  console.log("html: " , html)
  //const user = new mongoose.Types.ObjectId();
  // const blog = new Blog(req.body,user );
  const blog = new Blog({
    title: req.body.title,
    body:html,
    user: req.user._id,
    username: req.user.username,
    seenCounter: 0,
    userImage: req.user.image
  });
  await blog.save()
    .then(result => {
      req.flash('success', 'Your blog has been created');
      //res.render("details", { profileUser:req.user, blog, moment });
      res.redirect(`/blogs/post=${ result.slug }`)
    })
    .catch(err => {
      req.flash('error', 'something went wrong');

      console.log(err);
    });
  const user1 = await User.findById(req.user._id);
  await user1.blogs.push(blog);
  await user1.save();
})
//edit

const show = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug })
  const profileUser = await User.findOne({ username: blog.username })

  const blogs = await Blog.find({ user: profileUser }).sort({ createdAt: -1 }).limit(5)
  if (req.user) {
    if (!blog.seenUsers.includes(req.user._id)) {//req.ip
      blog.seenUsers.push(req.user._id);
      blog.seenCounter++;
      await blog.save();
    }
  } else {
    if (!blog.seenIp.includes(req.ip)) {
      blog.seenIp.push(req.ip);
      blog.seenCounter++;
      await blog.save();
    }
  }
  /* console.log("before: ", blog.body)
  blog.body=quill.getContents(blog.body)
  console.log("after: ",blog.body) */
  
  res.render("details", { profileUser, blog, moment, blogs });

})
//blog_edit
const blog_edit = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ slug: req.params.slug }).exec()
    .then(result => {
      res.render('edit', { blog: result, });
    }).catch(err => {
      //return next(err);
      if (!blog) {        //return next(new AppError('page not found', 404));
        console.log(err);
        req.flash('error', err.message || 'Oops! something went wrong.');
        return res.status(500).redirect('back');
      }
    }
    )

});

/* app.put('/blogs/:id', 
 */
const blog_update = catchAsync(async (req, res) => {
  await Blog.findOneAndUpdate({ slug: req.params.slug }, req.body, { runValidators: true, new: true })//...req.body.result
    .then(result => {


      //Blog.updateOne().exec();
      console.log(result.slug);
      req.flash('success', 'updated successfully');

      res.redirect(`/blogs/post=${ result.slug }`)//      res.redirect(`/blogs/${blog.id}`);

    }).catch(err => {
      req.flash('error', 'something went wrong');

      console.log(err);
    });
});



/* 
try {
}
catch (err) {
  next(err);  //will fire 'app.use((err, req, res, next) => {' from the app.js
}
 
*/
const blog_follow_username = catchAsync(async (req, res) => {
  const user = await User.findByUsername(req.params.username);
  if (user._id.equals(req.user._id)) {
    console.log('cant follow your self');
    req.flash('error', 'cant follow your self');
    return res.redirect('back');
  }
  if (!req.user.following.includes(user._id)) {
    req.user.following.push(user._id);
    user.followers.push(req.user._id)
    await user.save();
    await req.user.save();
    req.flash('success', 'Followed');
    console.log('followed');
  }
  else {//unfollow
    user.followers.splice(user.followers.indexOf(req.user._id), 1)
    req.user.following.splice(req.user.following.indexOf(user._id), 1)
    await user.save();
    await req.user.save();
    req.flash('success', 'unFollowed');
    console.log('unFollow');
  }
  //console.log("***************************")
  //console.log(req.user.following)
  res.redirect('back');
});

/*   const blog_follow = catchAsync(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    const user = await User.findById(blog.user);

    if (user.followers.length == 0 || !user.followers.includes(req.user._id)) {
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
  }); */


const newBlogers = catchAsync(async (req, res) => {
  await User.find().sort({ createdAt: -1 })//.populate('user', 'username')
    .then(result => {
      //moment.locale('ar');
      res.render('newBlogers', { users: result });
    })
    .catch(err => {
      console.log(err);
    });
});

const blog_like = catchAsync(async (req, res) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  //const user = await User.findById(blog.user);
  if (!blog.likes.includes(req.user._id)) {
    blog.likes.push(req.user._id);
    req.user.likes.push(blog);
    await blog.save();
    await req.user.save();
    req.flash('success', 'liked');

    console.log('like');
  }
  else {
    blog.likes.pop(req.user._id);
    req.user.likes.pop(blog);
    await blog.save();
    await req.user.save();
    console.log('unlike');
    req.flash('success', 'unlike');

  }
  res.redirect('back');
});

//delete
const blog_delete = catchAsync(async (req, res) => {
  await Blog.findOneAndDelete({ slug: req.params.slug })
    .then(result => {
      // result.deleteOne();
      req.flash('success', 'deleted');

      res.redirect('/');
    })
    .catch(err => {
      req.flash('error', 'something went wrong');

      console.log(err);
    });
})

module.exports = {
  blog_index,
  //blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_edit,
  blog_update,
  //blog_myblogs,
  // blog_follow,
  blog_follow_username,
  blog_like,
  show
  , blog_mostSeen,
  newBlogers

}