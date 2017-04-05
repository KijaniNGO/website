import React from 'react'
import syled from 'styled-components'
import Link from 'next/link'
import 'isomorphic-fetch'

const Wrapper = syled.div`

`

const Blog = ({post}) => (
    <Wrapper className="Blog">
        <h1>Blog</h1>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <Link href="/blogpost?slug=hello-world" as="/blog/hello-world">
            <a>Hello world</a>
        </Link>
    </Wrapper>
)

let host
if (typeof window !== 'undefined') {
    host = `http://${window.location.host}`
} else {
    host = `http://localhost:${process.env.PORT}`
}

const get = async (route="/") => {
    let response = await fetch(`${host}/api${route}`)
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    } else {
        let data = await response.json()
        return data
    }
}


Blog.getInitialProps = async () => {
    console.log('fetching from api')
    let data = await get('/')
    return data
}

export default Blog
