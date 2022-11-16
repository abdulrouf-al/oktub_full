const express = require('express');
const blogController = require('../controllers/blogController');
const { isLoggedIn,isAuthor } = require('../middleware/authMiddleware');
const router = express.Router();
//router.get('/myblogs', blogController.blog_myblogs); 

router.get('/create',isLoggedIn, blogController.blog_create_get);
router.get("/post=:slug", blogController.show);
router.get('/mostSeen', blogController.blog_mostSeen);
router.post('/',isLoggedIn, blogController.blog_create_post);
router.delete('/:slug', isLoggedIn, isAuthor, blogController.blog_delete);
router.get("/newBlogers", blogController.newBlogers);
router.get('/', blogController.blog_index);

//router.get('/:slug', blogController.blog_details);
router.post('/:username/follow', isLoggedIn, blogController.blog_follow_username);
//router.post('/:slug/follow', isLoggedIn, blogController.blog_follow);
router.post('/:slug/like', isLoggedIn, blogController.blog_like);
router.get('/:slug/edit',isLoggedIn,isAuthor, blogController.blog_edit);
router.put('/:slug',isLoggedIn,isAuthor, blogController.blog_update);
module.exports = router;