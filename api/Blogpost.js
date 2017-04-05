import { Document } from 'camo'

import Author from './Author'

export default class Blogpost extends Document {
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
            }
        })
    }

    static collectionName() {
        return 'blogposts'
    }
}
