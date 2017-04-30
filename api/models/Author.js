import { Document } from 'camo'

export class Author extends Document {
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
