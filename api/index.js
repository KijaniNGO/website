import { Router } from 'express'
import bodyParser from 'body-parser'
import { connect } from 'camo'
import { Blogpost, Author, User } from './models'
import Cookies from 'universal-cookie'
import { verify as verifyPassword } from 'password-hash'

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
        slug: 'first-post',
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

api.post('/authenticate', async (req, res) => {
    const { username, password } = req.body
    const { pwdhash } = await User.findOne({username})
    if (verifyPassword(password, pwdhash)) {
        res.json({loggedin: true, authToken: '1'})
    } else {
        res.json({loggedin: false})
    }
})

api.post('/blogpost', async (req, res) => {
    console.log('API: posting blogpost')
    let blogpost = req.body
    blogpost.slug = blogpost.title.toLowerCase().split(' ').join('-')
    const saved = await Blogpost.create(blogpost).save()
    res.json({success: saved})
})

api.get('/blogpost', async (req, res) => {
    console.log('API: getting all blogposts')
    const blogposts = await Blogpost.find({}, {sort: '-date'})
    res.json({blogposts})
})

api.get('/blogpost/:slug', async (req, res) => {
    console.log(`API: getting blogpost ${req.params.slug}`)
    const blogpost = await Blogpost.findOne({slug: req.params.slug})
    res.json({blogpost})
})

api.delete('/blogpost/:id', async (req, res) => {
    console.log(`API: deleting blogpost ${req.params.id}`)
    const blogpost = await Blogpost.deleteOne({_id: req.params.id})
    res.json({blogpost})
})

export default api
