import React from 'react'
import syled from 'styled-components'
import Link from 'next/link'

const Wrapper = syled.div`

`

const Blog = () => (
    <Wrapper className="Blog">
        <h1>Blog</h1>
        <Link href="/blogpost?slug=hello-world" as="/blog/hello-world">
            <a>Hello world</a>
        </Link>
    </Wrapper>
)

export default Blog
