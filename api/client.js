import 'isomorphic-fetch'

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
export const post = async (route='/', data) => sendRequest('POST', route, data)
export const remove = async (route='/', data) => sendRequest('DELETE', route, data)

export const authenticate = async (authToken) => {
    const { loggedin } = await post('/auth', {authToken})
    return loggedin
}

export const login = async (username, password) => {
    const { loggedin, authToken } = await post('/login', {username, password})
    return authToken
}
