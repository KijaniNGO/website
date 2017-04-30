import { Document } from 'camo'
import { Router } from 'express'

import { Author } from './Author'

export class Blogpost extends Document {
    constructor() {
        super()
        this.schema({
            title: {
                type: String,
                required: true
            },
            content: {
                type: [String]
            },
            author: {
                type: Author
            },
            date: {
                type: Date,
                default: Date.now
            },
            slug: {
                type: String,
                required: true,
                unique: true
            }
        })
    }

    static collectionName() {
        return 'blogposts'
    }
}

const api = Router()

api.post('/', async (req, res) => {
    console.log('API: posting blogpost')
    let blogpost = req.body
    blogpost.slug = blogpost.title.toLowerCase().split(' ').join('-')
    const saved = await Blogpost.create(blogpost).save()
    res.json({success: saved})
})

api.get('/', async (req, res) => {
    console.log('API: getting all blogposts')
    const blogposts = await Blogpost.find({}, {sort: '-date'})
    res.json({blogposts})
})

api.get('/:slug', async (req, res) => {
    console.log(`API: getting blogpost ${req.params.slug}`)
    const blogpost = await Blogpost.findOne({slug: req.params.slug})
    res.json({blogpost})
})

api.delete('/:id', async (req, res) => {
    console.log(`API: deleting blogpost ${req.params.id}`)
    const blogpost = await Blogpost.deleteOne({_id: req.params.id})
    res.json({blogpost})
})

export default api
