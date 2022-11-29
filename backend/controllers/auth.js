import bcrypt from "bcrypt";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
import response from "./defaultResponse.js";

// register method
export const Register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            picturePath
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            picturePath
        });
        const savedUser = await newUser.save();

        response(res, 201, true, 'User Created', savedUser)
    } catch (err) {
        response(res, 500, false, err.message, {})
    }
}

// login method
export const Login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return response(res,400,false,`user with this email doesn't exist.`)


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return response(res, 400,false,'invalid credentials', {})


        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        delete user.password;

        response(res, 200, true, 'login success', {token, user})
    }catch (err){
        response(res, 500, false, err.message, {})
    }
}