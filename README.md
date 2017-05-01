

## Dev Notes
this uses ES6 transpiling for the node server, as well to allow for the same js syntax everywhere. See description of the setup [here](https://github.com/babel/example-node-server)


### Admin Interface Styling

The admin interface is based on [antd](https://ant.design/docs/react/introduce) components. To adjust the theme, you need to install less with `yarn global add less less-plugin-clean-css`. Then you can edit the variables in `static/antd-theme.less` and compile them with `yarn antd-theme`.



### Used Modules

**Data:**
`nedb` node based database
`camo` object document mapper for NeDB
`jimp` pure node image processing

**Frontend:**
`react` frontend react components
`prop-types` type declarations for react
`antd` enterprise ui framework for react
`styled-components` css in js framework for react
`nprogress` add progress bar for page loading

**Utilities:**
`lodash` general js utilities
`moment` js date utilities
`dotenv` read env variables from .env files
`password-hash` save passwords with bcrypt
`universal-cookie` cookie parser for front and backend
`path-match` route matching
`url` url parsing
`glob` find disk files with glob patterns
`uuid` generate unique ids

**Server:**
`next` react server side rendering
`express` server framework
`body-parser` json requests parsing middleware for express
`muler` file upload stream processing middleware for express

**Development:**
`babel` make future js features available today
`nodemon` watch changes and automatically restart server
`flow` type checking for code editor
`jest` test runner for front and backend
`supertest` helpers for http request integratio tests
