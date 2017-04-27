import { isEmpty } from 'lodash'
import React from 'react'
import NextLink from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'
import { parse as parseUrl, format as formatUrl } from 'url'
import PathMatcher from 'path-match'
import NProgress from 'nprogress'

import ROUTES from '~/static/routes.json'


Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

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
    const href = formatUrl({pathname: target, query: {...params, ...query}})
    return {href, as: url}
}

export const routes = ROUTES

export const onRoute = (url) => {
    const { href, as } = getNextLinkParams(url)
    console.log('router pushing', as, 'via', href)
    Router.push(href, as)
}

export const LinkButton = ({href, onClick, children, ...props}) => (
    <Button {...props} onClick={(e) => {e.preventDefault(); onRoute(href)}}>{children}</Button>
)

export const Link = ({href, onClick, children}) => {
    if(href) {
        return (
            <NextLink {...getNextLinkParams(href)}>
                <a>{children}</a>
            </NextLink>
        )
    } else if (onClick) {
        return (
            <a onClick={(e) => {e.preventDefault(); onClick()}} href="#">{children}</a>
        )
    } else {
        return (
            <a href="#">{children}</a>
        )
    }
}
