import express from "express";
import {getMe} from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

router.get('/getMe', verifyToken, getMe);

export default router;