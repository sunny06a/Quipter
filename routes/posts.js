import express from 'express';
import { getFeedPosts, getUserPost,likePost } from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/',verifyToken, getFeedPosts);
router.get('/:userId/posts',verifyToken, getUserPost);

router.put('/:id/like', verifyToken, likePost);

export default router;