import { config } from 'dotenv'
import { generate as hashPassword } from 'password-hash'
import { connect } from 'camo'
import { User } from '~/api/models'

config() // load .env variables into process.env

connect(process.env.DB_DIR).then(async () => {
    const saveUser = async (username, password) => {
        if (username && password) {
            const pwdhash = hashPassword(password)
            const user = await User.create({username, pwdhash}).save()
            return user
        }
    }

    const user = await saveUser('admin@kijani.ngo', 'test')
    console.log('created admin', user)
})
