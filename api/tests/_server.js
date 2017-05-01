// @flow
import express, { Router } from 'express'
import bodyParser from 'body-parser'
import request from 'supertest'
import { connect } from 'camo'

type json = {[string]: any}

export const dbConnect = () => {
    connect('nedb://memory').then(() => {})
}

export default {
    server: express().use(bodyParser.json()),
    use(route: string='/', app: Router): void {
        dbConnect()
        this.server.use(route, app)
    },
    fetch(method: string, route: string, data: json={}) {
        const req = request(this.server)[method.toLowerCase()](route)
        return req.type('json').send(data).accept('json')
    },
    get(route: string) {
        return this.fetch('GET', route)
    },
    put(route: string, data: json) {
        return this.fetch('PUT', route, data)
    },
    create(route: string, data: json) {return this.post(route, data)},
    post(route: string, data: json) {
        return this.fetch('POST', route, data)
    },
    remove(route: string) {return this.delete(route)},
    delete(route: string) {
        return this.fetch('DELETE', route)
    },
}
