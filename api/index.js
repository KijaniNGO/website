import { connect } from 'camo'
import { Router } from 'express'
import bodyParser from 'body-parser'

import auth from './auth'
import blogpost from './models/Blogpost'

const VERSION = '0.4'

let DB
connect('nedb://.nedb').then((conn) => {DB = conn})

const api = Router()
api.use(bodyParser.json())

api.use('/auth', auth)
api.use('/blogpost', blogpost)

api.get('/', async (req, res) => {
    res.json({version: VERSION})
})

export default api
