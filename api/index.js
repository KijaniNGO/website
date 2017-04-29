import { Router } from 'express'
import bodyParser from 'body-parser'
import { connect } from 'camo'
import { Blogpost, Author, User } from './models'
import Cookies from 'universal-cookie'
import { verify as verifyPassword } from 'password-hash'
import uuid from 'uuid'

let DB
connect('nedb://.nedb').then((conn) => {DB = conn})


const api = Router()
api.use(bodyParser.json())

const AUTH_TOKENS = []

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

api.post('/auth', async (req, res) => {
    console.log('API: authenticating')
    const { authToken } = req.body
    if (AUTH_TOKENS.indexOf(authToken) >= 0) {
        res.json({loggedin: true})
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
