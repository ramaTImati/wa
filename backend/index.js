import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import waRoutes from "./routes/whatsapp.js";
import __dirname from "./controllers/directory.js";

// config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// Route
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/v1', waRoutes);

// Files Storage
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public/assets");
    },
    filename(req, file, callback) {
        cb(null, file.originalname);
    }
})
const upload = multer({storage})

/* monggose db setup */
const PORT = process.env.PORT || 8001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`running at ${PORT}`));
}).catch((error) => console.log(`Can't Connect on Server`))
