import { upperFirst } from 'lodash'
import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import Cookies from 'universal-cookie'
import { Layout, Menu, Breadcrumb, Icon, Button, Form, Input, LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import { Link, onRoute, Logo } from '~/components'
import ROUTES from '~/static/routes.json'

const adminRoutes = Object.keys(ROUTES)
    .filter((route) => {
        let parts = route.split('/')
        return route !== '/admin/' && (parts.length === 3 || parts.length === 4 && parts[3] === '') && parts[1] === 'admin'
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

const Wrapper = styled.div`

`

const AdminPanel = ({children, onLogout}) => (
    <Layout style={{minHeight: "100vh"}}>
        <Layout.Sider collapsible collapsedWidth="42" breakpoint="sm" >
            <Menu
                onClick={({key}) => key === 'LOGOUT' ? onLogout() : onRoute(key)}
                theme="dark" mode="inline"
                defaultSelectedKeys={['/'+window.location.pathname.split('/').filter(i => i).slice(0,2).join('/')+'/']}
            >
                <Menu.Item key="/" style={{height: "72px", marginLeft: "10px"}}>
                    <Logo width="125px" withName/>
                </Menu.Item>
                <li className="ant-menu-item-divider" style={{margin: "12px 24px"}}></li>
                <Menu.Item key="/admin/">
                    <Icon type="home"/>Home
                </Menu.Item>
                {adminRoutes.map(route => (
                    <Menu.Item key={route.href}>
                        <Icon type="bars"/>{route.name}
                    </Menu.Item>
                ))}
                <li className="ant-menu-item-divider" style={{margin: "12px 24px"}}></li>
                <Menu.Item key="LOGOUT">
                    <Icon type="logout"/>Log out
                </Menu.Item>
            </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Button onClick={() => window.history.back()} icon="left-circle-o"/>
                <Breadcrumb style={{margin: '12px 0', width: '80%'}}>
                    {window.location.pathname.split('/').map((item, i, arr) => (
                        <Breadcrumb.Item key={item}>
                            <Link href={arr.slice(0, i+1).join('/')+'/'}>{upperFirst(item)}</Link>
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </div>
            <Layout.Content style={{ background: '#fff', padding: 24, margin: 0}}>
                {children}
            </Layout.Content>
        </Layout>
    </Layout>
)

const LogIn = Form.create()(({form: {getFieldDecorator, getFieldsValue}, onLogin}) => (
    <Layout style={{textAlign: 'center', padding: '2rem', background: "#404040", minHeight: "100vh"}}>
        <div style={{background: '#fff', padding: 24, margin: "0 auto", borderRadius: "12px", width: "320px"}}>
            <Form onSubmit={(e) => {
                e.preventDefault()
                let { user, password } = getFieldsValue()
                if (user === 'admin@kijani.ngo' && password === 'test') {
                    onLogin()
                }
            }}>
                <h1>Admin Login</h1><br/>
                <Form.Item>
                    {getFieldDecorator('user', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    <Icon type="login"/>Log in
                </Button>
            </Form>
        </div>
    </Layout>
))

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
            <LocaleProvider locale={enUS}>
                <Wrapper>
                    <Head><link rel="stylesheet" href="/static/antd.min.css"/></Head>
                    {this.state.loggedin ? (
                        <AdminPanel children={this.props.children} onLogout={this.logout}/>
                    ) : (
                        <LogIn onLogin={this.login}/>
                    )}
                </Wrapper>
            </LocaleProvider>
        )
    }
}
