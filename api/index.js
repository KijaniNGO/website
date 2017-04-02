import { Router } from 'express'
import bodyParser from 'body-parser'

const api = Router()
api.use(bodyParser.json())

let store = {}

const save = async (data) => {
    store = data
    return true
}

api.post('*', async (req, res) => {
    console.log('API received', req.body)
    let saved = await save(req.body)
    res.json({success: saved})
})

api.get('*', async (req, res) => {
    console.log('API responding with', store)
    res.json({store})
})

export default api
