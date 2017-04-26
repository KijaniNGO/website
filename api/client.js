import 'isomorphic-fetch'

let host
if (typeof window !== 'undefined') {
    host = `http://${window.location.host}`
} else {
    host = `http://localhost:${process.env.PORT}`
}

// export const get = async (route="/") => {
//     let response = await fetch(`${host}/api${route}`)
//     if (response.status >= 400) {
//         throw new Error("Bad response from server");
//     } else {
//         let data = await response.json()
//         return data
//     }
// }

const sendJSON = async (method, route="/", data) => {
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

export const put = async (route="/", data) => sendJSON('PUT', route, data)
export const get = async (route="/", data) => sendJSON('GET', route, data)
export const create = async (route="/", data) => sendJSON('POST', route, data)
export const remove = async (route="/", data) => sendJSON('DELETE', route, data)
