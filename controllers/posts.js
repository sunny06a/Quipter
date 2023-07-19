import Post from '../models/Post.js';
import User from '../models/User.js';

//Create
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

//Read
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
        const {userID}=req.params;
        const post = await Post.find(userID);
        res.status(200).json(post);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const likePost = async (req, res) => {
    try{
        const {id}=req.params;
        const post = await Post.findById(id);
        const {userId} = req.body;
        const isliked = post.likes.get(userId);
        if(isliked){
            post.likes.delete(userId);
        } 
        else{
            post.likes.set(userId,true);
        }
        const updatedPost = await Post.findByIdAndUpdate(id,{likes:post.likes} , {new: true});
        res.status(200).json(updatedPost);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}