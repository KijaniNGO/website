import React from 'react'
import syled from 'styled-components'
import Link from 'next/link'
import { get } from '../api/client'

const Wrapper = syled.div`

`

const Blog = (props) => (
    <Wrapper className="Blog">
        <h1>Blog</h1>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <Link href="/blogpost?slug=hello-world" as="/blog/hello-world">
            <a>Hello world</a>
        </Link>
    </Wrapper>
)


Blog.getInitialProps = async () => {
    console.log('fetching from api')
    let data = await get('/blogpost')
    return data
}

export default Blog
