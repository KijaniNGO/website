import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { authenticateWithToken } from '~/api/client'

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
            const authToken = context.query.authToken
            const pathname = serverSide ? context.req.path : Router.route
            const { loggedin } = await authenticateWithToken(authToken)
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
