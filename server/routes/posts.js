import express from 'express';
import { getFeedPosts, getUserPosts,likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

//Read posts
router.get('/',verifyToken, getFeedPosts);
router.get('/:userId/posts',verifyToken, getUserPosts);

//Update likes
router.put('/:id/like', verifyToken, likePost);

export default router;