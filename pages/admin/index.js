import Head from 'next/head'
import React from 'react'

import Blogpost from './Blogpost'
import Login from './Login'

const Admin = () => (
    <div>
        <Head>
            <link rel="stylesheet" href="static/antd.min.css"/>
        </Head>
        <Blogpost/>
    </div>
)

export default Admin
