# A webpack loader to handle favicon creation

Uses [favicon](https://github.com/itgalaxy/favicons) to create a potentially  ___very___ wide array of favicons for you.

## When to not use this loader

* If you are using webpack in combination with the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to create your HTML output - you should probably use [favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin) instead, as it handles almost everything for you.
* If you are ok with a little bit of work and probably won't change your favicon that often - you might be ok to use favicon-cli or any kind of online favicon creator (e.g. [https://realfavicongenerator.net](https://realfavicongenerator.net)). As favicon creation takes quite some time (and that time is also required when starting your dev-server) a pre-generated set of favicons might be the easier / faster solution.
* If there is no server-side-rendering in your project

## When to consider using this loader
* if none of the above reasons applies to you / your project
* if you render your HTML on the server and create the output yourself (afaik there is no option in [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to extract html / files and continue working with them)
* if you change your favicon frequently
* if you are a lazy developer (and do not want to run through a manual favicon creation process every time the favicon source changes)

## How to use
``` javascript
npm  install --save-dev favicon-loader
```

### Configuration
Add the loader to your webpack configuration (or replace your existing image loader)
```javascript
// webpack.config.[ts|js]
// ...
  module: {
    loaders: [
      {
        test: /probably_a_specific_favicon_path_or_icon\.(gif|jpe?g|png|svg|webp|ico)$/,
		use: [{
		  loader: 'favicon-loader',
		  options: {

		  }
		]
      }
    ]
  }
// ...

... TODO: finish writing