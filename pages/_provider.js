import React from 'react'
import PropTypes from 'prop-types'
import { authenticate } from '~/components/api'
import Cookies from 'universal-cookie'

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
            let authToken, pathname
            if (context.req) { //server side
                authToken = new Cookies(context.req.headers.cookie).get('auth')
                pathname = context.req.path
            } else { //client side
                authToken = new Cookies().get('auth')
                pathname = context.pathname
            }
            console.log('setting pathname', pathname)
            const loggedin = await authenticate(authToken)
            // set context that will be provided
            const providedContext = {loggedin, pathname}
            // get initial props of component
            if (Component.getInitialProps) {
                let props = await Component.getInitialProps(context)
                return {...props, ...providedContext}
            } else {
                return {...providedContext}
            }
        }
        render() {
            return <Component {...this.props}/>
        }
    }
}
