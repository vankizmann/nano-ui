<p align="center"><img width="170" src="https://github.com/vankizmann/nano-ui/blob/master/nano.svg?raw=true" alt="nano-ui"></p>

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

### CDN Usage

```html
<script src="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.js"></script>
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

### Demo

[Click me to see demo :cat:](https://vankizmann.github.io/nano-ui/demos/overview.html)

### ES5/6 Precompile

Incase you are not using the babel plugins (ES6) used in *babel.config.js* you will encounter errors while compiling. To prevent that its required to add an alias to your *webpack.config.js*.

#### webpack.config.js
```js
module.exports = {
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.esm.js'
        }
    }
}
```

#### webpack.mix.js
```js
mix.webpackConfig({
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.esm.js'
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

### Input Elements
These are the html replacements for input, button, etc.

[NButton](#coming-soon)<br>
Classic button 
  

[NInpt](#coming-soon)<br>
Classic input field
  

[NTextarea](#coming-soon)<br>
Classic textarea


[NInputNumber](#coming-soon)<br>
Number input with steps and formats
  

[NSelect](#coming-soon)<br>
Single or multiselect field
  

[NCascader](#coming-soon)<br>
Tree select box
  

[NCheckbox](#coming-soon)<br>
Classic checkbox or grouped checkboxes


[NRadio](#coming-soon)<br>
Classic radio groups


[NSwitch](#coming-soon)<br>
On/off toggle like on iOS
  

[NDatepicker](#coming-soon)<br>
Datepicker for single or daterange


[NTimepicker](#coming-soon)<br>
Regular timepicker


[NDatetimepicker (WIP)](#coming-soon)<br>
*Description following soon*


[NTransfer](#coming-soon)<br>
Transfers items into a list, also supports drag and drop

### List Elements
These are components which are used to disaplay items.

[NDraglist](#coming-soon)<br>
Drag and drop list with tree support

[NDraggrid](#coming-soon)<br>
Drag and drop grid with virtual scrolling

[NTable](#coming-soon)<br>
Drag and drop table with tree support


[NPaginator](#coming-soon)<br>
*Description following soon*
  
### Overlay Elements
These components display information above your application layer.

[NPopover](#coming-soon)<br>
Popover element (tooltip e.g.)


[NModal](#coming-soon)<br>
Classic modal component


[NConfirm](#coming-soon)<br>
Confirmation box


[Notify](#coming-soon)<br>
Notification popup

### Other Elements
These components display information above your application layer.

[NForm](#coming-soon)<br>
*Description following soon*


[NTabs](#coming-soon)<br>
*Description following soon*


[NLoader](#coming-soon)<br>
*Description following soon*

[NMap](#coming-soon)<br>
*Description following soon*


[NScrollbar](#coming-soon)<br>
*Description following soon*


[NVirtualscroller](#coming-soon)<br>
*Description following soon*