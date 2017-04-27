import React from 'react'
import styled from 'styled-components'
import { Link, onRoute } from '~/components'

const Wrapper = styled.div`
    font-family: Bree;
    color: seagreen;
`

export default () => (
    <Wrapper>
        <h1>Hello, World!</h1>
        <h2>This is the new Kijani website</h2>
        <Link href="/blog/">/blog/ Next Link</Link><br/>
        <Link onClick={() => onRoute("/blog/")}>/blog/ Router Link</Link><br/>
        <a href="/blog/">/blog/ Normal Link</a><br/>
        <br/>
        <Link href="/blog/test-post">/blog/test-post Next Link</Link><br/>
        <Link onClick={() => onRoute("/blog/test-post")}>/blog/test-post Router Link</Link><br/>
        <a href="/blog/test-post">/blog/test-post Normal Link</a><br/>
        <br/>
        <Link href="/test">/test Next Link</Link><br/>
        <Link onClick={() => onRoute("/test")}>/test Router Link</Link><br/>
        <a href="/test">/test Normal Link</a><br/>
        <br/>
        <Link href="/blog/test">/blog/test Next Link</Link><br/>
        <Link onClick={() => onRoute("/blog/test")}>/blog/test Router Link</Link><br/>
        <a href="/blog/test">/blog/test Normal Link</a><br/>
        <br/>
        <Link href="/folder">/folder Next Link</Link><br/>
        <Link onClick={() => onRoute("/folder")}>/folder Router Link</Link><br/>
        <a href="/folder">/folder Normal Link</a><br/>
        <br/>
        <Link href="/folder/test">/folder/test Next Link</Link><br/>
        <Link onClick={() => onRoute("/folder/test")}>/folder/test Router Link</Link><br/>
        <a href="/folder/test">/folder/test Normal Link</a><br/>
        <br/>
        <Link href="/admin/blog">/admin/blog Next Link</Link><br/>
        <Link onClick={() => onRoute("/admin/blog")}>/admin/blog Router Link</Link><br/>
        <a href="/admin/blog">/admin/blog Normal Link</a><br/>
    </Wrapper>
)
