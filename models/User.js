import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    lastName:{
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 6,
    },
    picturePath:{
        type: String,
        default: "",
    },
    friends:{
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    imperssions: Number,
}, {timestamps: true});

export default mongoose.model("User", UserSchema);