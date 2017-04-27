import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    font-family: Bree;
    color: darkred;
`

const ErrorPage = (query) => (
    <Wrapper>
        <h1>Ups</h1>
        <h2>Something went wrong</h2>
        <h3>The received query was</h3>
        <pre>{JSON.stringify(query, null, 4)}</pre>
    </Wrapper>
)

ErrorPage.getInitialProps = ({query}) => {
    return query
}

export default ErrorPage
