import server from './_server'
import api from '~/api/index'

test('tests are working', () => {
    expect(true).toBe(true)
})

describe('api is up and responding', () => {
    beforeAll(async () => {
        server.use('/', api)
    })

    test('api responds with 200', async () => {
        await server.get('/').expect(200)
    })

    test('api responds with version', async () => {
        const { body: {version} } = await server.get('/')
        expect(Number(version)).toBeGreaterThan(0)
    })
})
