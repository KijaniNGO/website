import { Router } from 'express'
import bodyParser from 'body-parser'
import db from './db'
import Blogpost from './Blogpost'
import Author from './Author'


const getFirstPost = async () => {
    let tobias = await Author.create({
        firstName: 'Tobias',
        lastName: 'Lohse'
    }).save()

    let post = await Blogpost.create({
        title: 'First Post',
        content: [
            'This is a first post to the Kijani Blog.',
            'Only to test wether Camo, and NeDB work and I can figure out how to serve this data via an Express API and consume it with Next.js'
        ],
        author: tobias
    }).save()

    return post
}




const api = Router()
api.use(bodyParser.json())

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
    const post = await getFirstPost()
    console.log('API responding with', post)
    res.json({post})
})

export default api
