import Express from "express";
import { getUser,getUserFriends,addRemoveFriends } from "../controllers/user.js";
import {verifyToken} from "../middleware/auth.js";
const router = Express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
router.put('/:id/:friendId', verifyToken, addRemoveFriends);

export default router;

