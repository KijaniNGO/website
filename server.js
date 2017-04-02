import express from 'express'
import next from 'next'
import routes from './routes'
import api from './api'


const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(async () => {
    // init express server
    const server = express()

    // register api routes
    server.use('/api', api)

    // handle special routes defined in routes.js
    for (let endpoint in routes) {
        server.get(endpoint, (req, res) => {
            return app.render(req, res, routes[endpoint], req.query)
        })
    }

    // handle default routes in pages with next.js
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
})
