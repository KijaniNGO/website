import React from 'react'
import styled from 'styled-components'
import provider from '~/pages/_provider'
import { AdminWrapper } from '~/components'
import { Button, Input, Form } from 'antd'
import { isEmpty } from 'lodash'
import { create } from '~/components/api'

const StyledForm = styled(Form)`
    padding: 1rem;
`

const Blogpost = ({form: {getFieldDecorator, getFieldsValue}}) => (
    <AdminWrapper>
        <StyledForm layout="vertical" onSubmit={(e) => {
            e.preventDefault()
            handleFormSubmit(getFieldsValue())
        }}>
            <h1>Create New Blogpost</h1><br/>
            <Form.Item label="Title">
                {getFieldDecorator('title')(
                    <Input/>
                )}
            </Form.Item>
            <Button type="primary" htmlType="submit" icon="save">Save</Button>
        </StyledForm>
    </AdminWrapper>
)

const handleFormSubmit = async (data) => {
    console.log('sending data to api', data)
    return create('/blogpost', data)
}

export default provider(Form.create()(Blogpost))
