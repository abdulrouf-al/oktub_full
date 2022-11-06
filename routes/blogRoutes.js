const express = require('express');
const blogController = require('../controllers/blogController');
const { isLoggedIn,isAuthor } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/create',isLoggedIn, blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/',isLoggedIn, blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
//router.get('/myblogs', blogController.blog_myblogs);
router.delete('/:id',isLoggedIn,isAuthor, blogController.blog_delete);
router.post('/:id/follow', isLoggedIn, blogController.blog_follow);
router.post('/:username/follow', isLoggedIn, blogController.blog_follow_username);

router.post('/:id/like', isLoggedIn, blogController.blog_like);

router.get('/:id/edit',isLoggedIn,isAuthor, blogController.blog_edit);
router.put('/:id',isLoggedIn,isAuthor, blogController.blog_update);
module.exports = router;