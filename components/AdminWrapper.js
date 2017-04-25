import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import Cookies from 'universal-cookie'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'

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

const AdminPanel = ({children, onLogout}) => (
    <Layout>
        <Layout.Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
        </Layout.Header>
        <header>
            <Button onClick={onLogout}>log out</Button>
        </header>
        <main>{children}</main>
    </Layout>
)

const LogIn = ({onLogin}) => (
    <div style={{textAlign: 'center', padding: '2rem'}}>
        <Button onClick={onLogin} type="primary">log in</Button>
    </div>
)

export default class AdminWrapper extends React.Component {
    constructor() {
        super()
        this.state = {loggedin: false}
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    componentDidMount() {
        const auth = getCookie('auth')
        if (auth === '1') {
            this.setState({loggedin: true})
        }
    }

    login() {
        setCookies({auth: '1'})
        this.setState({loggedin: true})
    }

    logout() {
        setCookies({auth: '0'})
        this.setState({loggedin: false})
    }

    render() {
        return (
            <div>
                <Head><link rel="stylesheet" href="/static/antd.min.css"/></Head>
                {this.state.loggedin ? (
                    <AdminPanel children={this.props.children} onLogout={this.logout}/>
                ) : (
                    <LogIn onLogin={this.login}/>
                )}
            </div>
        )
    }
}
