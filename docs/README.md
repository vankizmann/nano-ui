# Installation

```bash
npm install @kizmann/nano-ui
```

<hr>

## Dependencies

This package is dependent of [@kizmann/pico-js](https://github.com/vankizmann/pico-js) as well as [moment](https://github.com/moment/moment).

<hr>

## Global Usage

```html
<script src="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.js"></script>
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.css">
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/themes/light.css">
```

```js
App.use(nano.Install);
```

<hr>

## Module Usage
```js
import { Install } from "@kizmann/nano-ui";
```

```js
App.use(Install);
```

```scss
@import "@kizmann/nano-ui/nano/index.scss";
```

<hr>

## ES5/6 Precompile

Incase you are not using the babel plugins (ES6) used in *babel.config.js* you will encounter errors while compiling. To prevent that its required to add an alias to your *webpack.config.js*.

#### webpack.config.js
```js
module.exports = {
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.js'
        }
    }
}
```

#### webpack.mix.js
```js
mix.webpackConfig({
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.js'
        }
    }
});
```

<hr>

## Visual Studio Code Autocomplete

When using VS Code with the ES5 fix from above you need to create or add to your existsing *jsconfig.json* this alias to enable correct autocomplete.

#### jsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@kizmann/nano-ui": ["node_modules/@kizmann/nano-ui/src/index.js"]
    }
  }
}
```
