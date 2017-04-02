import nextRoutes from 'next-routes'
const routes = nextRoutes()

routes.add('blogpost', '/blog/:slug')

export default routes
