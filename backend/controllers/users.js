import User from "../models/User.js";
import response from "./defaultResponse.js";

export const getMe = async (req, res) => {
    try {
        const {_id, username, email, createdAt, updatedAt} = await User.findById(req.user.id)

        response(res, 200, true, 'users data', {
            id: _id,
            username: username,
            email: email,
            created: createdAt,
            updatedAt: updatedAt
        })
    } catch (err) {
        response(res, 404, false, 'cannot find user', {})
    }
}