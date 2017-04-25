import React from 'react'
import styled from 'styled-components'
import AdminWrapper from '~/components/AdminWrapper'
import { LinkButton } from '~/components'

const Blog = () => (
    <AdminWrapper>
        <h1>Blog</h1>
        <LinkButton type="primary" href='/admin/blog/new'>New Post</LinkButton>
    </AdminWrapper>
)

export default Blog
