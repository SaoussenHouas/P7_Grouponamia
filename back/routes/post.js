const router = require('express').Router()
const multer = require('../middleware/multer-config')
const verify = require('../middleware/verifyToken')
const postCtrl = require('../controllers/post')


// Get all post on homepage
router.get('/', verify, postCtrl.getAllPost)

// Get one post 
router.get('/:id', verify, postCtrl.getOnePost)

// Create a new Post
router.post('/', verify,  multer, postCtrl.createPost)

// Modifiy a Post
router.put('/:id', verify, multer, postCtrl.modifyPost)

// Delete a Post
router.delete('/:id', verify, postCtrl.deletePost);

// Like Post
router.post('/:id/like', verify, postCtrl.likePost)


module.exports = router;