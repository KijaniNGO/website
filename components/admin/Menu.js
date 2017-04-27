import React from 'react'
import PropTypes from 'prop-types'
import { upperFirst } from 'lodash'
import { Layout, Menu, Breadcrumb, Icon, Button, Form, Input } from 'antd'
import Logo from '../Logo'
import { Link, onRoute, routes } from '../Router'

const adminRoutes = () => {
    return Object.keys(routes).filter((route) => {
        let parts = route.split('/')
        return route !== '/admin/' && (parts.length === 3 || parts.length === 4 && parts[3] === '') && parts[1] === 'admin'
    }).map((route) => ({name: upperFirst(route.split('/')[2]), href: route}))
}

const AdminMenu = ({children, onLogout, pathname}) => (
    <Layout style={{minHeight: "100vh"}}>
        <Layout.Sider collapsible collapsedWidth="42" breakpoint="sm" >
            <Menu
                onClick={({key}) => key === 'LOGOUT' ? onLogout() : onRoute(key)}
                theme="dark" mode="inline"
                defaultSelectedKeys={['/'+pathname.split('/').filter(i => i).slice(0,2).join('/')+'/']}
            >
                <Menu.Item key="/" style={{height: "72px", marginLeft: "10px"}}>
                    <Logo width="123px" withName/>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="/admin/">
                    <Icon type="home"/>Home
                </Menu.Item>
                {adminRoutes().map(route => (
                    <Menu.Item key={route.href}>
                        <Icon type="bars"/>{route.name}
                    </Menu.Item>
                ))}
                <Menu.Divider/>
                <Menu.Item key="LOGOUT">
                    <Icon type="logout"/>Log out
                </Menu.Item>
            </Menu>
        </Layout.Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Button onClick={() => window.history.back()} icon="left-circle-o"/>
                <Breadcrumb style={{margin: '12px 0', width: '80%'}}>
                    {pathname.split('/').map((item, i, arr) => (
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

AdminMenu.defaultProps = {
    pathname: '/default/'
}

AdminMenu.propTypes = {
    onLogout: PropTypes.func,
    pathname: PropTypes.string
}

export default AdminMenu
