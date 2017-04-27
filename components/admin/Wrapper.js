import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import Cookies from 'universal-cookie'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { authenticateWithToken, authenticateWithPassword } from '~/api/client'

import AdminMenu from './Menu'
import Login from './Login'


const COOKIE_OPTIONS = {
    path: '/',
    httpOnly: false,
    maxAge: 14*(24*60*60)
}

const setCookie = (key, value) => {
    const cookies = new Cookies()
    cookies.set(key, value, COOKIE_OPTIONS)
}

const deleteCookie = (key) => {
    const cookies = new Cookies()
    const expires = new Date(Date.now()-1000)
    cookies.set(key, '', {...COOKIE_OPTIONS, expires})
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
        const authToken = getCookie('auth')
        if (authToken === '1') {
            this.setState({loggedin: true})
        }
        this.setState({pathname: window.location.pathname})
    }
    login() {
        setCookie('auth', '1')
        this.setState({loggedin: true})
    }
    logout() {
        deleteCookie('auth')
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
