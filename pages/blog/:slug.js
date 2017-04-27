import React from 'react'
import syled from 'styled-components'

const Wrapper = syled.div`
    background: black;
    color: white;
`

const Blogpost = (props) => (
    <Wrapper>
        <h1>{props.slug}</h1>
        <pre>{JSON.stringify(props, null, 4)}</pre>
    </Wrapper>
)

Blogpost.getInitialProps = ({query}) => {
    return query
}

export default Blogpost
