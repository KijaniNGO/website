import { config } from 'dotenv'
import { generate as hashPassword } from 'password-hash'
import { connect } from 'camo'
import { User } from '~/api/models'

config() // load .env variables into process.env

const makeFirstPost = async () => {
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

const saveUser = async (username, password) => {
    if (username && password) {
        const pwdhash = hashPassword(password)
        const user = await User.create({username, pwdhash}).save()
        return user
    }
}

connect(process.env.DB_DIR).then(async () => {
    const user = await saveUser('admin@kijani.ngo', 'test')
    console.log('created admin', user)
})
