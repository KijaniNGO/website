import express from 'express'
import next from 'next'
import routes from './routes'

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(async () => {
    const server = express()

    for (let route in routes) {
        server.get(route, (req, res) => {
            return app.render(req, res, routes[route], req.query)
        })
    }

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
