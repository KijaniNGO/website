import 'isomorphic-fetch'

let host
if (typeof window !== 'undefined') {
    host = `http://${window.location.host}`
} else {
    host = `http://localhost:${process.env.PORT}`
}

export const authenticateWithToken = async (token) => {
    const loggedin = token === '1'
    return {loggedin}
}

export const authenticateWithPassword = async ({user, password}) => {
    return {loggedin: token === '1'}
}

const sendRequest = async (method, route="/", data) => {
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

export const put = async (route="/", data) => sendRequest('PUT', route, data)
export const get = async (route="/", data) => sendRequest('GET', route, data)
export const create = async (route="/", data) => sendRequest('POST', route, data)
export const remove = async (route="/", data) => sendRequest('DELETE', route, data)
