import { isSessionExists } from "../controllers/whatsappController.js";
import response from "./../controllers/defaultResponse.js";

const validate = (req, res, next) => {
    const sessionId = req.query.id ?? req.params.id

    if (!isSessionExists(sessionId)) {
        return response(res, 404, false, 'Session not found.')
    }

    res.locals.sessionId = sessionId
    next()
}

export default validate