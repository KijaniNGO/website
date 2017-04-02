import express from 'express'
import next from 'next'

import routes from './routes'


const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = routes.getRequestHandler(app)

app.prepare().then(async () => {
    express().use(handle).listen(3000)
})
