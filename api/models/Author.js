import { Document } from 'camo'

export default class Author extends Document {
    constructor() {
        super()
        this.schema({
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            }
        })
    }

    static collectionName() {
        return 'authors'
    }
}
