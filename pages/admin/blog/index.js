import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Table, Icon, Modal } from 'antd'
import { Link, LinkButton, AdminWrapper } from '~/components'
import { get } from '~/api/client'

const onDelete = (post) => {
  Modal.confirm({
    title: `Do you really want to delete this post?`,
    content: `Deleting the post '${post.title}' cannot be undone.`,
    maskClosable: true,
    iconType: 'exclamation-circle',
    okText: 'Delete',
    onOk() {
      return new Promise((resolve, reject) => {
        setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      }).catch(() => console.log('Oops errors!'));
    },
    onCancel() {}
  })
}

const onPublish = (post) => {
    alert(`publishing '${post.title}'`)
}

const Actions = ({post}) => (
    <div>
        <Link href={`/admin/blog/${post.slug}`}>Edit</Link>
        <span className="ant-divider" />
        <Link onClick={() => onPublish(post)}>Publish</Link>
        <span className="ant-divider" />
        <Link onClick={() => onDelete(post)}>Delete</Link>
    </div>
)

const Blog = ({blogposts}) => (
    <AdminWrapper>
        <h1>Blogposts</h1><br/>
        <Table
            pagination={false}
            columns={[
                {title: 'Title', dataIndex: 'title'},
                {title: 'Datum', dataIndex: 'date', render: (date) => moment(date).format('MMM D, YYYY')},
                {title: 'Action', key: 'action', render: (_, post) => <Actions post={post}/>, width: 176},
            ]}
            dataSource={blogposts}
            footer={() => (
                <div style={{marginRight: '24px', textAlign: 'right'}}>
                    <LinkButton type="primary" href='/admin/blog/new' icon="plus">New Post</LinkButton>
                </div>
            )}
        /><br/>
    </AdminWrapper>
)

Blog.getInitialProps = async () => {
    let data = await get('/blogpost')
    return data
}

export default Blog
