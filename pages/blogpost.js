import React from 'react'

const Blogpost = ({slug}) => (
    <div>
        <h2>{slug}</h2>
    </div>
)

Blogpost.getInitialProps = async ({query}) => {
    return query
}

export default Blogpost
