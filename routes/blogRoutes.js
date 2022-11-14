const express = require('express');
const blogController = require('../controllers/blogController');
const { isLoggedIn,isAuthor } = require('../middleware/authMiddleware');
const router = express.Router();
//router.get('/myblogs', blogController.blog_myblogs); 

router.post('/:username/follow', isLoggedIn, blogController.blog_follow_username);

router.get('/create',isLoggedIn, blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.get('/mostSeen', blogController.blog_mostSeen);
router.post('/',isLoggedIn, blogController.blog_create_post);
router.delete('/:slug', isLoggedIn, isAuthor, blogController.blog_delete);


router.get("/:slug", blogController.show);

//router.get('/:slug', blogController.blog_details);

router.post('/:slug/follow', isLoggedIn, blogController.blog_follow);
router.post('/:slug/like', isLoggedIn, blogController.blog_like);
router.get('/:slug/edit',isLoggedIn,isAuthor, blogController.blog_edit);
router.put('/:id',isLoggedIn,isAuthor, blogController.blog_update);//bugged
module.exports = router;