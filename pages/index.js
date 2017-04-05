import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.div`
    font-family: Bree;
    color: seagreen;
`

export default () => (
    <Wrapper>
        <h1>Hello, World!</h1>
        <h2>This is the new Kijani website</h2>
        <Link href="/blog">
            <a>Go To Blog</a>
        </Link>
    </Wrapper>
)
