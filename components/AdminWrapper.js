import Head from 'next/head'
import styled from 'styled-components'
import React from 'react'
import { Button } from 'antd'

const Wrapper = styled.div`
    max-width: 40rem;
    margin: 0 auto;
`

const AdminPanel = ({children}) => (
    children
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
    }

    login() {
        this.setState({loggedin: true})
    }

    render() {
        console.log(this.state.loggedin)
        return (
            <Wrapper>
                <Head><link rel="stylesheet" href="/static/antd.min.css"/></Head>
                {this.state.loggedin ? <AdminPanel children={this.props.children}/> : <LogIn onLogin={this.login}/>}
            </Wrapper>
        )
    }
}
