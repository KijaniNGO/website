import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

import AdminMenu from './Menu'
import Login from './Login'

const setCookies = (obj) => {
    const cookies = new Cookies()
    const OPTIONS = {
        path: '/',
        httpOnly: false,
        maxAge: 14*(24*60*60)
    }
    for (let o in obj) {
        cookies.set(o, obj[o], OPTIONS)
    }
}

const getCookie = (key) => {
    const cookies = new Cookies()
    return cookies.get(key)
}

export default class AdminWrapper extends React.Component {
    static contextTypes = {
        loggedin: PropTypes.bool,
        pathname: PropTypes.string
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            loggedin: context.loggedin,
            pathname: context.pathname
        }
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }
    componentDidMount() {
        const auth = getCookie('auth')
        if (auth === '1') {
            this.setState({loggedin: true})
        }
        this.setState({pathname: window.location.pathname})
    }
    login() {
        setCookies({auth: '1'})
        this.setState({loggedin: true})
    }
    logout() {
        setCookies({auth: '0'})
        this.setState({loggedin: false})
    }
    render = () => (
        <LocaleProvider locale={enUS}>
            <div>
                <Head><link rel="stylesheet" href="/static/antd.min.css"/></Head>
                {this.state.loggedin ? (
                    <AdminMenu children={this.props.children} onLogout={this.logout} pathname={this.state.pathname}/>
                ) : (
                    <Login onLogin={this.login}/>
                )}
            </div>
        </LocaleProvider>
    )
}
