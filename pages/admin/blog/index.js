import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import provider from '~/pages/_provider'
import { Table, Icon, Modal } from 'antd'
import { Link, LinkButton, AdminWrapper } from '~/components'
import { get, remove } from '~/components/api'

const onDelete = (blogpost, setBlogposts) => {
    Modal.confirm({
        title: `Do you really want to delete this blogpost?`,
        content: `Deleting the blogpost '${blogpost.title}' cannot be undone.`,
        maskClosable: true,
        iconType: 'exclamation-circle',
        okText: 'Delete',
        onOk() {
            return (async () => {
                let deleted = await remove(`/blogpost/${blogpost._id}`)
                let { blogposts } = await get('/blogpost')
                setBlogposts(blogposts)
                return deleted
            })()
        },
        onCancel() {}
    })
}

const onPublish = (blogpost) => {
    Modal.confirm({
        title: `Do you want to publish this blogpost?`,
        content: `Publishing the blogpost '${blogpost.title}' will make it visible on the internet.`,
        maskClosable: true,
        iconType: 'exclamation-circle',
        okText: 'Publish',
        onOk() {
            return (async () => {
                let published = await put(`/blogpost/${blogpost._id}`)
                let { blogposts } = await get('/blogpost')
                setBlogposts(blogposts)
                return published
            })()
        },
        onCancel() {}
    })
}

const Actions = ({blogpost, onSetBlogposts}) => (
    <div>
        <Link href={`/admin/blog/edit?slug=${blogpost.slug}`}>Edit</Link>
        <span className="ant-divider" />
        <Link onClick={() => onPublish(blogpost)}>Publish</Link>
        <span className="ant-divider" />
        <Link onClick={() => onDelete(blogpost, onSetBlogposts)}>Delete</Link>
    </div>
)

class Blogposts extends React.Component {
    static getInitialProps = async () => {
        let data = await get('/blogpost')
        return data
    }
    constructor(props) {
        super(props)
        this.state = {blogposts: this.props.blogposts}
        this.setBlogposts = this.setBlogposts.bind(this)
    }
    setBlogposts(blogposts) {
        this.setState({blogposts})
    }
    render() {
        const { blogposts } = this.state
        return (
            <AdminWrapper>
                <h1>Blogposts</h1><br/>
                <Table
                    pagination={false}
                    columns={[
                        {title: 'Title', dataIndex: 'title'},
                        {
                            title: 'Datum',
                            dataIndex: 'date',
                            render: (date) => moment(date).format('MMM D, YYYY')
                        }, {
                            title: 'Action',
                            width: 176,
                            key: 'action',
                            render: (_, blogpost) => (
                                <Actions blogpost={blogpost} onSetBlogposts={this.setBlogposts}/>
                            )
                        },
                    ]}
                    dataSource={blogposts.map(blogpost => ({...blogpost, key: blogpost._id}))}
                    footer={() => (
                        <div style={{marginRight: '24px', textAlign: 'right'}}>
                            <LinkButton type="primary" href='/admin/blog/new' icon="plus">New Post</LinkButton>
                        </div>
                    )}
                /><br/>
            </AdminWrapper>
        )
    }
}

export default provider(Blogposts)
