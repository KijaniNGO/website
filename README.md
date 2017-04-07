

## Dev Notes
this uses ES6 transpiling for the node server, as well to allow for the same js syntax everywhere. See description of the setup [here](https://github.com/babel/example-node-server)


### Admin Interface Styling

The admin interface is based on [antd](https://ant.design/docs/react/introduce) components. To adjust the theme, you need to install less with `yarn global add less less-plugin-clean-css`. Then you can edit the variables in `static/antd-theme.less` and compile them with `yarn antd-theme`.
