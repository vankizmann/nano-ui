<p align="center"><img width="170" src="https://github.com/vankizmann/nano-ui/blob/master/assets/nano-ui-dark.svg?raw=true" alt="nano-ui"></p>

<p align="center">
  <a href="https://www.npmjs.org/package/@kizmann/nano-ui">
    <img src="https://img.shields.io/npm/v/@kizmann/nano-ui.svg">
  </a>
  <a href="https://npmcharts.com/compare/@kizmann/nano-ui?minimal=true">
    <img src="http://img.shields.io/npm/dm/@kizmann/nano-ui.svg">
  </a>
  <br>
</p>

<p align="center">A vue3 based ui library optimized for desktop applications with drag and drop in mind.</p>
<br>

### Installation

```bash
npm install @kizmann/nano-ui [or] yarn add @kizmann/nano-ui
```

### Dependencies

This package is dependent of [@kizmann/pico-js](https://github.com/vankizmann/pico-js) as well as [moment](https://github.com/moment/moment).

### Global Usage

```html
<script src="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.js"></script>
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.css">
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/themes/light.css">
```

```js
App.use(nano.Install);
```

### Module Usage
```js
import { Install } from "@kizmann/nano-ui";
```

```js
App.use(Install);
```

```scss
@import "@kizmann/nano-ui/nano/index.scss";
```

### Demo

[Click me to see demo :cat:](https://vankizmann.github.io/nano-ui/demos/overview.html)

### ES5/6 Precompile

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

### Visual Studio Code Autocomplete

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
