// @flow
import 'isomorphic-fetch'
import { isEmpty } from 'lodash'
import Cookies from 'universal-cookie'

type json = {[string]: any}

let host: string
if (typeof window !== 'undefined') {
    host = `http://${window.location.host}`
} else {
    const port = process.env.PORT
    host = `http://localhost:${port ? port : 3000}`
}

const sendRequest = async (method: MethodType, route='/', data: json): Promise<json> => {
    const body: ?string = isEmpty(data) ?  undefined : JSON.stringify(data)
    const headers = {"Content-type": "application/json"}
    let response = await fetch(`${host}/api${route}`, {body, method, headers})
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    } else {
        return await response.json()
    }
}

export const put = async (route:string, data: json): Promise<json> => sendRequest('PUT', route, data)
export const get = async (route:string): Promise<json> => sendRequest('GET', route, {})
export const create = async (route:string, data: json): Promise<json> => sendRequest('POST', route, data)
export const remove = async (route:string): Promise<json> => sendRequest('DELETE', route, {})

const COOKIE_OPTIONS = {
    path: '/',
    httpOnly: false,
    maxAge: 14*(24*60*60)
}

const setCookie = (key: string, value: string): void => {
    new Cookies().set(key, value, COOKIE_OPTIONS)
}

const deleteCookie = (key: string): void => {
    const expires = new Date(Date.now()-1000)
    new Cookies().set(key, '', {...COOKIE_OPTIONS, expires})
}

const getCookie = (key: string): void => {
    return new Cookies().get(key)
}

export const authenticate = async (authToken: string): Promise<boolean> => {
    const { loggedin } = await create('/auth', {authToken})
    return loggedin
}

export const login = async (username: string, password: string): Promise<boolean> => {
    const { loggedin, authToken } = await create('/auth/login', {username, password})
    if (authToken) {
        setCookie('auth', authToken)
        if (!await authenticate(authToken)) {
            throw Error(`there seems to be a problem with the returned authToken ${authToken}`)
        }
    } else {
        console.log('login failed')
    }
    return loggedin
}

export const logout = async (): Promise<boolean> => {
    deleteCookie('auth')
    return false
}
