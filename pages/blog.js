import React from 'react'
import syled from 'styled-components'
import Link from 'next/link'
import 'isomorphic-fetch'

const Wrapper = syled.div`

`

const Blog = ({data}) => (
    <Wrapper className="Blog">
        <h1>Blog</h1>
        <p>{JSON.stringify(data)}</p>
        <Link href="/blogpost?slug=hello-world" as="/blog/hello-world">
            <a>Hello world</a>
        </Link>
    </Wrapper>
)

Blog.getInitialProps = async () => {
    let response = await fetch('http://localhost:3000/api')
    if (response.status >= 400) {
        throw new Error("Bad response from server");
    }
    let data = await response.json()
    return {data}
}

export default Blog
