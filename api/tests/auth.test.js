import uuid from 'uuid'
import server, { dbConnect } from './_server'
import api, { User, tokenStore, saveUser, hashPassword, verifyPassword } from '~/api/auth'

const token = uuid()
const [ username, password ] = ['test@test.com', 'test']

describe('tokenStore', () => {
    test('tokens can be added', () => {
        tokenStore.add(token)
        expect(tokenStore.tokens).toContain(token)
    })

    test('tokens can be matched', () => {
        tokenStore.add(token)
        expect(tokenStore.match(token)).toBe(true)
        expect(tokenStore.match('not')).toBe(false)
    })

    test('tokens can be deleted', () => {
        tokenStore.add(token)
        expect(tokenStore.tokens).toContain(token)
        tokenStore.del(token)
        expect(tokenStore.tokens).not.toContain(token)
    })

    test('tokens cannot be added twice', () => {
        tokenStore.add(token)
        tokenStore.add(token)
        expect(tokenStore.tokens).toContain(token)
        tokenStore.del(token)
        expect(tokenStore.tokens).not.toContain(token)
    })
})

describe('saving users', () => {
    beforeEach(async () => {
        dbConnect()
    })

    test('user is saved correctly', async () => {
        await saveUser(username, password)
        const user = await User.findOne({username})
        expect(user.username).toBe(username)
    })

    test('password is saved as hash', async () => {
        await saveUser(username, password)
        const user = await User.findOne({username})
        expect(user.pwdhash).not.toBe(password)
        expect(verifyPassword(password, user.pwdhash)).toBe(true)
    })
})

describe('login api', () => {
    beforeAll(async () => {
        server.use('/auth', api)
    })

    test('auth responds with 200', async () => {
        await server.post('/auth', {authToken: 'test'}).expect(200)
    })

    test('auth returns correct loggedin state', async () => {
        const res1 = await server.post('/auth', {authToken: token})
        expect(res1.body.loggedin).toBe(false)
        tokenStore.add(token)
        const res2 = await server.post('/auth', {authToken: token})
        expect(res2.body.loggedin).toBe(true)
    })

    test('login responds with 200', async () => {
        await server.post('/auth/login', {username, password}).expect(200)
    })

    test('login returns loggedin state', async () => {
        const res1 = await server.post('/auth/login', {username, password})
        expect(res1.body.loggedin).toBe(false)
        await saveUser(username, password)
        const res2 = await server.post('/auth/login', {username, password})
        expect(res2.body.loggedin).toBe(true)
        const res3 = await server.post('/auth/login', {username, password: 'a'})
        expect(res3.body.loggedin).toBe(false)
    })

    test('login returns user missing error', async () => {
        const res1 = await server.post('/auth/login', {username: 'a', password})
        expect(res1.body.userFound).toBe(false)
        await saveUser(username, password)
        const res2 = await server.post('/auth/login', {username, password: 'a'})
        expect(res2.body.userFound).toBe(true)
    })

    test('login returns correct auth token', async () => {
        await saveUser(username, password)
        const res = await server.post('/auth/login', {username, password})
        expect(res.body.loggedin).toBe(true)
        expect(tokenStore.tokens).toContain(res.body.authToken)
    })

    test('wrong login does not set auth token', async () => {
        await saveUser(username, password)
        const res = await server.post('/auth/login', {username, password: 'a'})
        expect(res.body.loggedin).toBe(false)
        expect(tokenStore.tokens).not.toContain(res.body.authToken)
    })

    test('login returns auth token that works with auth', async () => {
        await saveUser(username, password)
        const { body: {authToken} } = await server.post('/auth/login', {username, password})
        expect(authToken.length).toBeGreaterThan(0)
        const res = await server.post('/auth', {authToken})
        expect(res.body.loggedin).toBe(true)
    })
})
