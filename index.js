import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";      // cross origin resource sharing 
import dotenv from "dotenv";  // environment variables
import multer from "multer";  // file storage
import helmet from "helmet";  // security headers 
import morgan from "morgan";  // http request logger 
import path from "path";      
import { fileURLToPath } from "url";  
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

//Configuration to get current file path and directory path
const __filename = fileURLToPath(import.meta.url);  // current file path
const __dirname = path.dirname(__filename);   // current directory path
dotenv.config();

//Middleware
const app = express();
app.use(express.json());
app.use(helmet());  
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Multer to store files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes with file upload
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Connect to MongoDB
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  }).catch((error) => console.log(`${error} did not connect`));