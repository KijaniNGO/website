import { Router } from 'express'
import bodyParser from 'body-parser'
import { connect } from 'camo'
import Blogpost from './Blogpost'
import Author from './Author'
import Cookies from 'universal-cookie'

const getAuth = (req) => {
    const cookies = new Cookies(req.headers.cookie)
    const auth = cookies.get('auth')
    req.auth = auth
    return auth
}

let db
connect('nedb://.nedb').then((conn) => db = conn)

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

api.post('/blogpost', async (req, res) => {
    console.log('API: posting blogpost')
    const saved = await Blogpost.create(req.body).save()
    res.json({success: saved})
})

api.get('/blogpost', async (req, res) => {
    console.log('API: getting blogpost')
    const blogpost = await Blogpost.find({}, {sort: '-date'})
    res.json({blogpost})
})

api.get('/blogpost/:id', async (req, res) => {
    const blogpost = await Blogpost.find({_id: req.id}, {sort: '-date'})
    console.log('API: getting blogpost')
    res.json({blogpost})
})

export default api
