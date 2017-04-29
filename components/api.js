import 'isomorphic-fetch'
import Cookies from 'universal-cookie'

let host
if (typeof window !== 'undefined') {
    host = `http://${window.location.host}`
} else {
    host = `http://localhost:${process.env.PORT}`
}

const sendRequest = async (method, route='/', data) => {
    let response = await fetch(`${host}/api${route}`, {
        method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    } else {
        let data = await response.json()
        return data
    }
}

export const put = async (route='/', data) => sendRequest('PUT', route, data)
export const get = async (route='/', data) => sendRequest('GET', route, data)
export const create = async (route='/', data) => sendRequest('POST', route, data)
export const remove = async (route='/', data) => sendRequest('DELETE', route, data)


const COOKIE_OPTIONS = {
    path: '/',
    httpOnly: false,
    maxAge: 14*(24*60*60)
}

const setCookie = (key, value) => {
    new Cookies().set(key, value, COOKIE_OPTIONS)
}

const deleteCookie = (key) => {
    const expires = new Date(Date.now()-1000)
    new Cookies().set(key, '', {...COOKIE_OPTIONS, expires})
}

const getCookie = (key) => {
    return new Cookies().get(key)
}

export const authenticate = async (authToken) => {
    const { loggedin } = await create('/auth', {authToken})
    return loggedin
}

export const login = async (username, password) => {
    const { loggedin, authToken } = await create('/login', {username, password})
    if (authToken) {
        setCookie('auth', authToken)
        const authIsWorking = await authenticate(authToken)
        if (!authIsWorking) {
            throw Error(`there seems to be a problem with the returned authToken ${authToken}`)
        }
    } else {
        console.log('login failed')
    }
    return loggedin
}

export const logout = async () => {
    deleteCookie('auth')
    return false
}
