import React from 'react'

const Blogpost = (props) => (
    <div>
        <h1>Blogpost</h1>
        <h2>{props.slug}</h2>
        <pre>{JSON.stringify(props)}</pre>
    </div>
)

Blogpost.getInitialProps = async ({query}) => {
    return query
}

export default Blogpost
