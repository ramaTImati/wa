import {getSession, getChatList, isExists, sendMessage, formatPhone, getContact} from "./whatsappController.js"
import response from "./defaultResponse.js";

const getList = (req, res) => {
    return response(res, 200, true, '', getChatList(res.locals.sessionId));
}

const getContacts = (req, res) => {
    return response(res, 200, true, 'succes getting contact list', [getContact(res.locals.sessionId)]);
}

const send = async (req, res) => {
    const session = getSession(res.locals.sessionId)
    const receiver = formatPhone(req.body.receiver)
    const {message} = req.body

    try {
        const exists = await isExists(session, receiver)

        if (!exists) {
            return response(res, 400, false, 'The receiver number is not exists.')
        }

        await sendMessage(session, receiver, message, 0)

        response(res, 200, true, 'The message has been successfully sent.')
    } catch {
        response(res, 500, false, 'Failed to send the message.')
    }
}

const getMessages = async (req, res) => {
    const session = getSession(res.locals.sessionId)

    const {jid} = req.params
    const {limit = 25, cursor_id = null, cursor_fromMe = null} = req.query

    const cursor = {}

    if (cursor_id) {
        cursor.before = {
            id: cursor_id,
            fromMe: Boolean(cursor_fromMe && cursor_fromMe === 'true'),
        }
    }

    try {
        let messages
        const useCursor = 'before' in cursor ? cursor : null

        if (session.isLegacy) {
            messages = await session.fetchMessagesFromWA(jid, limit, useCursor)
        } else {
            messages = await session.store.loadMessages(jid, limit, useCursor)
        }

        response(res, 200, true, '', messages)
    } catch {
        response(res, 500, false, 'Failed to load messages.')
    }
}

export {getList, send, getMessages, getContacts}