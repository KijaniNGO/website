import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

const authenticate = async (auth) => {
    return auth === '1'
}

export default (Component) => {
    return class extends React.Component {
        static childContextTypes = {
            loggedin: PropTypes.bool,
            pathname: PropTypes.string
        }
        getChildContext() {
            return {
                loggedin: this.props.loggedin,
                pathname: this.props.pathname
            }
        }
        static getInitialProps = async (context) => {
            console.log('server context', context.pathname)
            const serverSide = context.req
            const auth = context.query.auth
            const pathname = serverSide ? context.req.path : Router.route
            const loggedin = await authenticate(auth)
            if (Component.getInitialProps) {
                let props = await Component.getInitialProps(context)
                return {...props, loggedin, pathname}
            } else {
                return {loggedin, pathname}
            }
        }
        render() {
            return <Component {...this.props}/>
        }
    }
}
