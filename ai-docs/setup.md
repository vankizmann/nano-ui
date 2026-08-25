# Setup

## Install

```bash
npm install @kizmann/nano-ui
# or
yarn add @kizmann/nano-ui
```

Runtime dependency: `@kizmann/pico-js` (`^2.1.4`, listed under
`dependencies` in `package.json` — not `peerDependencies`, npm/yarn will
install it automatically). **There is no `moment` dependency in this
version** (`3.0.0`) — date/time logic uses pico-js's own `Now`/`Locale`
helpers. If other documentation claims a `moment` peer dependency, it's
describing an older/different version than what's in this repo.

## Module usage (ES modules)

```js
import { Install } from "@kizmann/nano-ui";
app.use(Install);
```

```scss
@import "@kizmann/nano-ui/nano/index.scss";
```

`Install`'s second/third parameters (`Icons`, `Settings`) are accepted but
currently inert — see `ai-docs/config.md`. Just call `app.use(Install)` with
no arguments.

## Global `<script>` usage

```html
<script src="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.browser.js"></script>
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/nano-ui.css">
<link rel="stylesheet" href="//unpkg.com/@kizmann/nano-ui@latest/dist/themes/default.css">
```

```js
App.use(nano.Install);
```

Global usage also depends on `@kizmann/pico-js` being loaded first as
`globalThis.pi` — `Install()` early-returns with a console error
(`'pico-js is not available.'`) if `globalThis.pi` is undefined.

## Theme CSS

Two shipped themes under `themes/`: `default` and `webservy`. Each exposes a
single entry stylesheet (`themes/<name>/index.scss`, or the built
`dist/themes/<name>.css`) that `@forward`s every component's theme partial.
Pick one theme's CSS to load — see `ai-docs/theming.md` for how to override
individual CSS custom properties instead of swapping the whole theme.

## ES5/6 precompile (webpack alias workaround)

Only needed if your build does **not** already run the babel plugins in this
repo's own `babel.config.cjs` (class properties, JSX, TS preset, etc. — the
library's source uses modern/TS syntax and is shipped as source under
`src/` as well as pre-built under `dist/`). If your bundler tries to compile
`node_modules/@kizmann/nano-ui/src/...` directly and fails, alias the import
to the pre-built ESM bundle instead:

```js
// webpack.config.js
module.exports = {
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.esm.js'
        }
    }
}
```

```js
// webpack.mix.js
mix.webpackConfig({
    resolve: {
        alias: {
            '@kizmann/nano-ui': '@kizmann/nano-ui/dist/nano-ui.esm.js'
        }
    }
});
```

With that alias in place, also point VS Code's autocomplete at the same
target via `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@kizmann/nano-ui": ["node_modules/@kizmann/nano-ui/src/index.js"]
    }
  }
}
```

## Demo

A full live demo covering most components: `demos/overview.html` (also
mirrored at https://vankizmann.github.io/nano-ui/demos/overview.html). This
is the source used throughout `ai-docs/components/*.md` for realistic usage
examples.
