import { upperFirst } from 'lodash'
import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import Cookies from 'universal-cookie'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import { Link, Logo } from '~/components'
import ROUTES from '~/static/routes.json'

const adminRoutes = Object.keys(ROUTES)
    .filter((route) => {
        let parts = route.split('/')
        return route !== '/admin/' && parts.length <= 4 && parts[1] === 'admin'
    }).map((route) => ({name: upperFirst(route.split('/')[2]), href: route}))

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
    <Layout style={{minHeight: "100vh"}}>
        <Layout.Sider className="header" >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={[window.location.pathname.split('/').slice(0,3).join('/')+'/']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="/home" style={{height: "84px", marginLeft: "-5px"}}>
                    <Link href="/"><Logo width="155px" withName/></Link>
                </Menu.Item>
                <Menu.Item key="/admin//">
                    <Link href="/admin/">
                        <Icon type="home"/>Home
                    </Link>
                </Menu.Item>
                {adminRoutes.map(route => (
                    <Menu.Item key={route.href}>
                        <Link href={route.href}>
                            <Icon type="bars"/>{route.name}
                        </Link>
                    </Menu.Item>
                ))}
                <li className="ant-menu-item-divider" style={{margin: "20px"}}></li>
                <Menu.Item key="logout">
                    <Icon type="logout"/><span onClick={onLogout}>Logout</span>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
                {window.location.pathname.split('/').map((item, i, arr) => (
                    <Breadcrumb.Item key={item}>
                        <Link href={arr.slice(0, i+1).join('/')+'/'}>{upperFirst(item)}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            <Layout.Content style={{ background: '#fff', padding: 24, margin: 0}}>
                {children}
            </Layout.Content>
        </Layout>
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
