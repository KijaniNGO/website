import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'

const Wrapper = styled.div`

`

const AdminWrapper = ({children}) => (
    <Wrapper>
        <Head><link rel="stylesheet" href="/static/antd.min.css"/></Head>
        {children}
    </Wrapper>
)

export default AdminWrapper
