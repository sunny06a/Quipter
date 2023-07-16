import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
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
        cb(null, 'public/assets/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

app.post('/auth/register', upload.single('picturePath'), register);
app.post('/posts',verifyToken, upload.single('picturePath'), createPost);

//routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
//mongodb connection
const PORT = process.env.PORT || 5001;
const CONNECTION_URL = process.env.MONGO_URL;
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)
)).catch((error) => console.log(error.message));