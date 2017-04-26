import React from 'react'
import { Layout, Icon, Button, Form, Input } from 'antd'

const Login = ({form: {getFieldDecorator, getFieldsValue}, onLogin}) => (
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
)

export default Form.create()(Login)
