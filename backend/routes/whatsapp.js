import {Router} from "express";
import {body, query} from "express-validator";
import requestValidator from "../middleware/requestValidator.js";
import sessionValidator from "../middleware/sessionValidator.js";
import * as controller from "../controllers/whatasappSessionsController.js";
import {verifyToken} from "../middleware/auth.js";
import * as controllers from "../controllers/whatsappchat.js"
import response from "../controllers/defaultResponse.js";

const router = Router();

//sessions route
router.post('/add', verifyToken, body('id').notEmpty(), body('isLegacy').notEmpty(), requestValidator, controller.add);
router.get('/find/:id', verifyToken, sessionValidator, controller.find);
router.get('/status/:id', verifyToken, sessionValidator, controller.status);
router.delete('/delete/:id', verifyToken, sessionValidator, controller.del);
//chats route
router.post('/chats/send', query('id').notEmpty(), body('receiver').notEmpty(), body('message').notEmpty(), verifyToken, requestValidator, sessionValidator, controllers.send);
router.get('/chats/history', query('id').notEmpty(), verifyToken, requestValidator, sessionValidator, controllers.getList);
router.get('/chats/getmessage/:jid', query('id').notEmpty(), verifyToken, requestValidator, sessionValidator, controllers.getMessages);
router.get('/getcontact', query('id').notEmpty(), verifyToken, requestValidator, sessionValidator, controllers.getContacts)

router.all('*', (req, res) => {
    response(res, 404, false, 'The requested url cannot be found.')
})

export default router