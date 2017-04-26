import React from 'react'
import provider from '~/pages/_provider'
import { AdminWrapper } from '~/components'

const Admin = () => (
    <AdminWrapper>
        <h1>Admin Home</h1>
    </AdminWrapper>
)

export default provider(Admin)
