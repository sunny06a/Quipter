import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  try{

  }catch(error){
    res.status(500).json({message: error.message});
  }
}

export const getFeedPosts = async (req, res) => {

}

export const getUserPost = async (req, res) => {
}

export const likePost = async (req, res) => {
}