# NMap

A geographic map (latitude/longitude, not an image/coordinate grid) that wraps `@kizmann/pico-js`'s `Map` class, which in turn wraps the Google Maps JavaScript API (`google.maps` — see `demos/map/index.html` and `demos/overview.html`, both of which load `https://maps.googleapis.com/maps/api/js`).

## Import / Registration

Registered globally by `src/map/index.ts` as `NMap` (`App.component(NMap.name, NMap)`), alongside `NMapMarker` in the same file. Source: `src/map/js/map/{NMap,NMapController,NMapData,NMapView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `lat` | `Number` | `0` | `NMap.ts` (own prop, not from shared `Props` mixins) | Initial map-center latitude, read once when the underlying Google `Map` is constructed. |
| `lng` | `Number` | `0` | `NMap.ts` (own prop) | Initial map-center longitude, read once at construction. |
| `zoom` | `Number` | `15` | `NMap.ts` (own prop) | Initial zoom level, read once at construction. |

`NMapProps` does not spread any group from the shared `Props` object (`src/root/index.ts`) — there is no `size`/`type`/`color`/`disabled`/`theme` prop on `NMap`. `NMapData.classList` calls `this.classRoot([])` with no extra modifier classes, so the root element only ever gets the base `n-map` BEM class (plus whatever `n-theme-*`/`n-disabled` `classRoot` derives from `BaseData` defaults, which are all `null`/`false` since nothing sets them).

## Events

| Event | Payload | Fired when |
|---|---|---|

`NMap.ts` declares `emits: []` — literally no emits, and `NMapController` never calls `this.emit(...)` or `this.update(...)`. Changing `:lat`/`:lng`/`:zoom` after mount does **not** recenter or re-zoom the map and there is no event to bind back to (see Gotchas).

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none (no scope object passed) | Rendered as children of the same `<div>` element that is passed to `new Map(el, {...})` as the map container — normally one or more `<n-map-marker>` elements. |

## Exposed methods

None. `NMapController` never calls `this.pass([...])`.

`NMapController` does expose an internal (non-public-API) `append(cb: Function)` method used by child `NMapMarker` instances via `provide('NMap', this.instance)` / `inject`/`ncx('map')` — this is the parent/child wiring described in "Required composition" below, not something a template consumer calls directly.

## Minimal example

```vue
<template>
  <n-map :lat="53.55" :lng="9.99" :zoom="9" />
</template>
```

## Realistic example

Adapted from `demos/overview.html` (draggable marker two-way-bound to the map's displayed coordinates):

```vue
<template>
  <n-form>
    <n-form-item label="Lat">
      <n-input v-model="location.lat" :disabled="true" />
    </n-form-item>
    <n-form-item label="Lng">
      <n-input v-model="location.lng" :disabled="true" />
    </n-form-item>
  </n-form>

  <n-map :lat="location.lat" :lng="location.lng" :zoom="9">
    <n-map-marker v-model:lat="location.lat" v-model:lng="location.lng" :drag="true" />
  </n-map>
</template>

<script setup>
import { reactive } from 'vue';
const location = reactive({ lat: 53.55, lng: 9.99 });
</script>
```

## Required composition

`NMap` is the required parent for `NMapMarker` — see `ai-docs/components/map-marker.md` for the precise rule and failure mode. `NMap` itself has no required parent or child; it renders standalone (an empty `<n-map>` is valid, just an empty Google Map canvas).

## Common mistakes

- Expecting `:lat`/`:lng`/`:zoom` to be reactive props that recenter/rezoom the live map: `NMapController.onMounted()` reads `this.data.lat/lng/zoom` exactly once to build `new Map(this.rel('el'), {...})`. There is no `watchProp` on any of the three in `NMapController.ts`. Changing them after mount has no effect on the map view.
- Binding `v-model` on `NMap` itself: it has no `modelValue` prop and `emits: []`. Position two-way-binding happens on `NMapMarker` (`v-model:lat` / `v-model:lng`), not on `NMap`.
- Forgetting to load the Google Maps JS API script (`<script src="https://maps.googleapis.com/maps/api/js?key=...">`) in the host page — both demos load it explicitly; nothing in `NMap`/`NMapController` injects it for you. <!-- UNVERIFIED: whether pico-js's `Map` class lazily loads the Google Maps script itself in some code path not visible in src/map/*.ts — not confirmed either way from this repo's source alone, since `Map` itself lives in the `@kizmann/pico-js` dependency, out of scope per task instructions. -->

## Gotchas

- The container `<div>` (`ref="el"`) serves double duty: it's both the literal DOM node handed to `new Map(el, {...})` (so Google Maps may inject its own canvas/controls as further children) and the Vue slot host rendering `<n-map-marker>` children (which themselves render `display: none` placeholder divs — see map-marker.md). Do not assume the rendered child markup is what visually represents the map; the visible map surface is painted by the Google Maps API into that same element.
- `demos/map/index.html` is written against an older/Vue-2-flavored API (`:lat.sync`, `:draggable`) that does not match the current source (`v-model:lat`, prop `drag` not `draggable`, `emits: []` on `NMap`). Treat `demos/overview.html` as the more current reference; see map-marker.md for the specific exposed-method mismatch this causes.
- `NMap` has no `disabled`/`size`/`type`/`color`/`theme` styling props at all — do not assume every nano-ui component gets these for free just because `ProtoData`/`classRoot` support them; a component only gets them if it spreads the relevant `Props.*` mixin, and `NMap` doesn't.

## Related components

- `NMapMarker` — the only component designed to be nested inside `NMap`; see `ai-docs/components/map-marker.md`.
