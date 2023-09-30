import {createSlice} from '@reduxjs/toolkit'
//initialState is used to set the initial state of the redux store
const initialState ={
    mode:"light",
    user: null,
    token:null,
    posts:[],
}

export const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
        //switches the mode from light to dark and vice-versa
        setMode:(state)=>{
            state.mode=state.mode==="light"?"dark":"light";
        },
        //sets the user and token in the redux store
        setLogin:(state,action)=>{
          state.user=action.payload.user;
          state.token=action.payload.token  
        },
        //removes the user and token from the redux store
        setLogout:(state)=>{
            state.user=null;
            state.token=null;
        },
        //sets the friends of the user in the redux store
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends=action.payload.friends;
            }
            else{
                console.log("user friends are non-existent :(");
            }
        },
        //sets the posts of the user in the redux store
        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        },
        //sets the post in the redux store when the user updates the post
        setPost:(state,action)=>{
            const updatedPosts=state.posts.maps((post)=>{
                if(post._id===action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts=updatedPosts;
        }
    }
})

export const {setMode, setLogin, setLogout,setFriends,setPosts,setPost} = authSlice.actions;
export default authSlice.reducer;