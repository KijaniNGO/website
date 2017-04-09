import { writeFile } from 'fs'
import { sync as glob } from 'glob'

const getRoutes = () => {
    const paths = glob('pages/**/*.js', {ignore: ['**/index.js', '**/_*', '**/_*/**']})
        .map(path => path.substr('pages'.length, path.length-('pages.js'.length)))
    const indexPaths = glob('pages/**/index.js', {ignore: ['**/_*/**']})
        .map(path => path.substr('pages'.length, path.length-('pages.js'.length)))
    let routes = {}
    paths.map(path => routes[path] = path)
    indexPaths.map(path => routes[path.substr(0, path.length-'index'.length)] = path)
    return routes
}

export const routes = getRoutes()

writeFile('static/routes.json', JSON.stringify(routes, null, 2))
