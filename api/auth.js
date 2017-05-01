import { Document } from 'camo'
import { Router } from 'express'
import { verify as verifyPassword, generate as hashPassword } from 'password-hash'
import uuid from 'uuid'

export class User extends Document {
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

export const saveUser = async (username, password) => {
    if (username && password) {
        const pwdhash = hashPassword(password)
        const user = await User.create({username, pwdhash}).save()
        return user
    }
}

export { verifyPassword, hashPassword }

const api = Router()

export const tokenStore = {
    tokens: new Set([]),
    add(token) { this.tokens.add(token) },
    del(token) { this.tokens.delete(token) },
    match(token) { return this.tokens.has(token) }
}

api.post('/', async (req, res) => {
    console.log('API: authenticating')
    const { authToken } = req.body
    if (tokenStore.match(authToken)) {
        res.json({loggedin: true})
    } else {
        res.json({loggedin: false})
    }
})

api.post('/logout', async (req, res) => {
    console.log('API: deleting token')
    const { authToken } = req.body
    if (tokenStore.match(authToken)) {
        tokenStore.del(authToken)
    }
    res.json({loggedin: false})
})

api.post('/login', async (req, res) => {
    console.log('API: logging in', req.body)
    const { username, password } = req.body
    const users = await User.find({})
    const user = await User.findOne({username})
    if (user && verifyPassword(password, user.pwdhash)) {
        const authToken = uuid()
        tokenStore.add(authToken)
        res.json({loggedin: true, userFound: true, authToken})
    } else {
        res.json({loggedin: false, userFound: !!user})
    }
})

export default api
