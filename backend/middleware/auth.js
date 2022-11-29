import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from headers
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            //get users from the token
            req.user = await User.findById(decode.id).select('-pasword')
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({msg: "not authorized"});
        }
    }
    if (!token) {
        res.status(401).json({msg: "not authorized"});
    }
}