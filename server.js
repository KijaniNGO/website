import express from 'express'
import next from 'next'
import { config } from 'dotenv'
import { writeFileSync } from 'fs'
import { sync as glob } from 'glob'

import api from '~/api'

config() // load .env variables into process.env

const getRoutes = () => {
    const paths = glob('pages/**/*.js', {ignore: ['**/index.js', '**/_*', '**/_*/**']})
        .map(path => path.substr('pages'.length, path.length-('pages.js'.length)))
        .sort(p => !!p.match(':'))
    const indexPaths = glob('pages/**/index.js', {ignore: ['**/_*/**']})
        .map(path => path.substr('pages'.length, path.length-('pages.js'.length)))
        .sort(p => !!p.match(':'))
    let routes = {}
    paths.map(path => routes[path] = path)
    indexPaths.map(path => routes[path.substr(0, path.length-'index'.length)] = path)
    return routes
}

// get routes from pages files and save to make routes accessible to frontend router
const routes = getRoutes()
writeFileSync('static/routes.json', JSON.stringify(routes, null, 2))

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare().then(async () => {
    // init express server
    const server = express()

    // register api routes
    server.use('/api', api)

    // handle routes defined in pages directory
    for (let path in routes) {
        server.get(path, (req, res) => {
            console.log('loading route:', path)
            const { params, query } = req
            return app.render(req, res, routes[path], {...params, query})
        })
    }

    // handle default routes in pages with next.js
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(process.env.PORT, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${process.env.PORT}`)
    })
})
