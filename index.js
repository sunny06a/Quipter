import express from 'express';    //import express
import bodyParser from 'body-parser';  //middleware for parsing json data
import cors from 'cors';  //middleware for cross origin resource sharing
import mongoose from 'mongoose';
import dotenv from 'dotenv';   //use dotenv file
import multer from 'multer';   //middleware for file storage
import path from 'path';       //middleware for file path
import morgan from 'morgan';    //middleware for logging
import helmet from 'helmet';    //middleware for security
import { fileURLToPath } from 'url';    //middleware for file path
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';

// configuration (middleware)
const __filename = fileURLToPath(import.meta.url); //file name //*only when use type module in package.json*//
const __dirname = path.dirname(__filename); //directory name

dotenv.config(); //use dotenv file

const app=express();
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})); 
app.use(morgan('common')); 
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); //use static file


//file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    },
});
const upload = multer({storage: storage});  //use file storage

//routes with file storage
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts',verifyToken, upload.single('picture'), createPost);

//routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);

//mongodb connection
const PORT = process.env.PORT || 5001;  //use port 5001 and if not available use other port 5001
const CONNECTION_URL = process.env.MONGO_URL;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)
)).catch((error) => console.log(error.message));