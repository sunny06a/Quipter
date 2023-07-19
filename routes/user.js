import express from "express";
import { getUser,getUserFriends,addRemoveFriend} from "../controllers/user.js";
import {verifyToken} from "../middleware/auth.js";
const router = express.Router();

//Read user
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

//Update friends
router.put('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;

