import React from 'react'
import NextLink from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { parse as parseUrl, format as formatUrl } from 'url'
import PathMatcher from 'path-match'

import ROUTES from '~/static/routes.json'

const matchRoute = (pathname) => {
    const matcher = PathMatcher({sensitive: false, strict: false, end: false})
    const matchedRoutes = Object.keys(ROUTES).filter(route => matcher(route)(pathname))
    if (matchedRoutes.length === 0) throw new Error(`Link cannot find matching route for "${pathname}"`)
    return {
        route: matchedRoutes[0],
        target: ROUTES[matchedRoutes[0]],
        params: matcher(ROUTES[matchedRoutes[0]])(pathname)
    }
}

const getRouteParams = (url) => {
    const { pathname, query } = parseUrl(url, true)
    const { route, target, params } = matchRoute(pathname)
    return { pathname, route, target, params, query }
}

const getNextLinkParams = (url) => {
    const { pathname, route, target, params, query } = getRouteParams(url)
    const href = formatUrl({pathname: target, query: {...params, query}})
    return {href, as: url}
}

export const onRoute = (href) => {
    console.log(href)
    Router.push(href)
}


export const LinkButton = ({href, children, ...props}) => (
    <Button {...props} onClick={(e) => {e.preventDefault(); onRoute(href)}}>{children}</Button>
)

const Link = ({href, children}) => (
    <NextLink {...getNextLinkParams(href)}>
        <a>{children}</a>
    </NextLink>
)

export default Link
