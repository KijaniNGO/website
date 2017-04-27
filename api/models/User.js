import { Document } from 'camo'

export default class User extends Document {
    constructor() {
        super()
        this.schema({
            username: {
                type: String,
                required: true,
                unique: true
            },
            pwdhash: {
                type: String,
                required: true
            }
        })
    }

    static collectionName() {
        return 'users'
    }
}
