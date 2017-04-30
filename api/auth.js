import { Document } from 'camo'
import { Router } from 'express'
import { verify as verifyPassword } from 'password-hash'
import uuid from 'uuid'


class User extends Document {
    constructor() {
        super()
        this.schema({
            username: {
                type: String,
                required: true,
                unique: true
            },
            pwdhash: {
                type: String,
                required: true
            }
        })
    }

    static collectionName() {
        return 'users'
    }
}

const api = Router()

let AUTH_TOKENS = []

api.post('/', async (req, res) => {
    console.log('API: authenticating')
    const { authToken } = req.body
    if (AUTH_TOKENS.indexOf(authToken) >= 0) {
        res.json({loggedin: true})
    } else {
        res.json({loggedin: false})
    }
})

api.post('/login', async (req, res) => {
    console.log('API: logging in', req.body)
    const { username, password } = req.body
    const users = await User.find({})
    const user = await User.findOne({username})
    console.log('found user', user, users)
    if (verifyPassword(password, user.pwdhash)) {
        const authToken = uuid()
        AUTH_TOKENS.push(authToken)
        res.json({loggedin: true, authToken})
    } else {
        res.json({loggedin: false})
    }
})

export default api
