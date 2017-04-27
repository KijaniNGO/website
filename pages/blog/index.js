import React from 'react'
import syled from 'styled-components'
import { get } from '~/api/client'
import { Link } from '~/components'

const Wrapper = syled.div`
    background: black;
    color: white;
`

const Blog = (props) => (
    <Wrapper className="Blog">
        <h1>Blog</h1>
        <pre>{JSON.stringify(props, null, 2)}</pre>
        <Link href="/blog/hello-world">
            Hello world
        </Link>
    </Wrapper>
)

Blog.getInitialProps = async () => {
    console.log('fetching from api')
    let data = await get('/blogpost')
    return data
}

export default Blog
