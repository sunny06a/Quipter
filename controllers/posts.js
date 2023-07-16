import Post from '../models/Post.js';
import User from '../models/User.js';
export const createPost = async (req, res) => {
  try{
    const {userId, description,picturePath}=req.body;
    const user= await User.findById(userId);
    const newPost= new Post({userId,firstName:user.firstName,lastName:user.lastName,location:user.location, description,userPicturePath:user.picturePath,picturePath,likes:{},comments:[]});
    await newPost.save();

    const posts = await Post.find();
    res.status(200).json(posts);
  }catch(error){
    res.status(500).json({message: error.message});
  }
}

export const getFeedPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);

    }catch(error){
        res.status(500).json({message: error.message});
    }

}

export const getUserPosts = async (req, res) => {
    try{
        const posts = await Post.find({userId: req.params.userId});
        res.status(200).json(posts);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        const {userId} = req.body;
        const isliked = post.likes.get(userId);
        if(isliked === undefined){
            post.likes.set(userId,true);
        } 
        else{
            post.likes.delete(userId);
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{likes:post.likes} , {new: true});
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(500).json({message: error.message});
    }

}