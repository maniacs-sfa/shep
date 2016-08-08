## Migrating from shep 0.X to shep 1.0

- Shep 1.0 only supports node 4.3. Make sure all functions are using the `callback` style instead of the old `context.done()` methods
- Remove `node_modules` and `package.json` from individual function folders. Shep 1.0 installs all the modules at the project level and then uses webpack to ensure only necessary modules are included in your build.
- Add a `lambda.json` file to your root directory. This will be the default lambda settings for every function. They will be overridden by anything in each functions `lambda.json` file
example:

```json
{
  "Handler": "index.handler",
  "MemorySize": 128,
  "Role": "",
  "Timeout": 10,
  "Runtime": "nodejs4.3"
}
```



- Each function folder should have it's own `lambda.json file`. Any settings in here will override the project level settings. Important! Shep used to have function namespacing built in but now this is up to the end user. Functions are generated with the following lambda.json by default:

```json
{
  "FunctionName": "$PROJECT_NAME-$FUNCTION_NAME"
}
```


- Remove all symlinks and instead reference the file directly. Webpack will handle bundling these files for you.
- Add `dist/*` to .gitignore
- Change all files in `config/` from `.json` to `.js`
- Run `shep pull`. This will pull down a swagger representation of the latest deployed API for your project. This will now be imported/exported to manage changes with API Gateway.
- Add a webpack.config.js file to the project root.

Example:
``` js
const path = require('path')

module.exports = function(name, env) {
  return {
    target: 'node',
    entry: {
      [name]: path.resolve(`functions/${name}/index.js`)
    },
    output: {
      path: path.resolve(`dist/${name}`),
      filename: 'index.js',
      chunkFilename: '[name]/[id].js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      modules: [ 'node_modules', 'lib' ],
      alias: { 'config': path.resolve(`config/${env}.js`) }
    },
    externals: { 'aws-sdk': 'aws-sdk' },
    module: {
      loaders: [
        {
          test: /.json$/,
          loader: 'json-loader'
        }
      ]
    }
  }
}
```