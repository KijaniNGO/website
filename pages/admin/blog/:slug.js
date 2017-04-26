import React from 'react'
import AdminWrapper from '~/components/AdminWrapper'
import { get } from '~/api/client'

const Blogpost = (props) => (
    <AdminWrapper>
        <h1>Edit Blogpost</h1>
        <pre>{JSON.stringify(props, null, 4)}</pre>
    </AdminWrapper>
)

Blogpost.getInitialProps = async ({query}) => {
    let blogpost = await get(`/blogpost/${query.slug}`)
    return {...query, blogpost}
}

export default Blogpost
