import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.friends.map(friendId => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map(friend => {
            const {_id, firstName,lastName, occupation,location, picturePath} = friend;
            friendList.push({_id,firstName,lastName,occupation,location, picturePath});
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const addRemoveFriends = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user= await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)) {
            user.friends=user.friends.filter(id => id !== friendId);
            friend.friends=friend.friends.filter(id => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        const friends = await Promise.all(
            user.friends.map(friendId => {
                return User.findById(friendId);
            })
        );
     
        let friendList = [];
        friends.map(friend => {
            const {_id, firstName,lastName, occupation,location, picturePath} = friend;
            friendList.push({_id,firstName,lastName,occupation,location, picturePath});
        });
        res.status(200).json(friendList);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}