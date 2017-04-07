import React from 'react'
import styled from 'styled-components'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import { post } from '../../api/client'

const StyledForm = styled(Form)`
    max-width: 40rem;
    margin: 0 auto;
    padding: 1rem;
`

const Blogpost = ({form: {getFieldDecorator, getFieldsValue}}) => {
    return (
      <StyledForm layout="vertical" onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit(getFieldsValue())
      }}>
          <h2>Create Blogpost</h2><br/>
          <Form.Item label="Title">
              {getFieldDecorator('title')(
                  <Input/>
              )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
              SAVE
          </Button>
      </StyledForm>
    );
  }

const handleFormSubmit = async (data) => {
    console.log('sending data to api', data)
    const response = await post('/blogpost', data)
    console.log(response)
}

export default Form.create()(Blogpost)
