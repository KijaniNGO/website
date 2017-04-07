import React from 'react'
import styled from 'styled-components'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
const FormItem = Form.Item

const StyledForm = styled(Form)`
    max-width: 20rem;
    margin: 0 auto;
    padding: 1rem;
    button {
      width: 100%;
    }
`

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <StyledForm onSubmit={this.handleSubmit}>
          <FormItem>
              {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your email!' }],
              })(
                  <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
              )}
          </FormItem>
          <FormItem>
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                  <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
          </FormItem>
          <Button type="primary" htmlType="submit">
              Log in
          </Button>
      </StyledForm>
    );
  }
}

export default Form.create()(Login)
