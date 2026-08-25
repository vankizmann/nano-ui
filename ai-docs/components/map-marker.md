# NMapMarker

A single draggable/positionable pin on a geographic `NMap` (Google Maps JavaScript API marker), two-way-bound to `lat`/`lng` coordinate props — not a generic image/coordinate-grid marker.

## Import / Registration

Registered globally by `src/map/index.ts` as `NMapMarker` (`App.component(NMapMarker.name, NMapMarker)`), alongside `NMap` in the same file. Source: `src/map/js/map-marker/{NMapMarker,NMapMarkerController,NMapMarkerData,NMapMarkerView}.ts`.

## Props

| Prop | Type | Default | Source | Description |
|---|---|---|---|---|
| `lat` | `Number` | `0` | `NMapMarker.ts` (own prop, not from shared `Props` mixins) | Marker latitude. Reactively watched (`watchProp('lat', ...)`) — changes after mount call `marker.marker.setPosition({ lat, lng })` on the underlying Google Maps marker. |
| `lng` | `Number` | `0` | `NMapMarker.ts` (own prop) | Marker longitude. Reactively watched the same way as `lat`. |
| `drag` | `Boolean` | `false` | `NMapMarker.ts` (own prop) | Passed to the Google Maps marker as `draggable`. When `true`, dragging the pin fires `position_changed` on the marker, which (debounced 500ms) writes the new coordinates back via `update('lat', ...)`/`update('lng', ...)`. |
| `options` | `Object` | `{}` | `NMapMarker.ts` (own prop) | Raw options object merged into the Google Maps marker options: `{ ...options, lat, lng, draggable: drag }` — `lat`/`lng`/`draggable` from the dedicated props always win over anything with the same key inside `options`. <!-- UNVERIFIED: exact accepted keys inside `options` beyond `lat`/`lng`/`draggable`/`html` — this is passed straight into pico-js's `Map.createMarker(uid, options)`, whose own option schema lives outside src/ and is out of scope per task instructions. --> |

Coordinate shape: both `lat` and `lng` are plain numbers (coerced via pico-js's `Num.float()` before being handed to the map), not a combined `{lat, lng}` object prop — e.g. `:lat="53.55" :lng="9.99"` or `v-model:lat="form.lat" v-model:lng="form.lng"`. Internally they are read/written as a `{ lat: number, lng: number }` object only at the Google Maps API boundary (`marker.marker.setPosition({ lat, lng })` / `.getPosition().lat()`/`.lng()`).

## Events

| Event | Payload | Fired when |
|---|---|---|
| `update:lat` | `number` — new latitude | The marker is dragged (if `drag` is `true`) and its Google Maps `position_changed` listener fires, debounced 500ms; `NMapMarkerController.updatePosition()` calls `this.update('lat', this.marker.marker.getPosition().lat())`. |
| `update:lng` | `number` — new longitude | Same trigger as above; `updatePosition()` also calls `this.update('lng', this.marker.marker.getPosition().lng())` in the same debounced callback. |

`NMapMarker.ts` declares **no `emits` array at all** (unlike `NMap.ts`, which at least declares `emits: []`). The `update:lat`/`update:lng` events still work because `ProtoController.update()` calls `context.emit()` directly — Vue allows emitting undeclared events, it just skips the (irrelevant here) prop-type validation and attribute-fallthrough exclusion emits declaration normally provides.

## Slots

| Slot | Scope | Purpose |
|---|---|---|
| `default` | none (no scope object passed) | Not rendered visibly — the marker's root `<div>` is `style="display: none;"`. If a default slot is present, `NMapMarkerController.initMarker()` instead reads `this.el.innerHTML` and passes it as `options.html` to `map.createMarker(uid, options)`, i.e. the slot content becomes the custom HTML content of the Google Maps marker overlay (see the "Huhu!" yellow box example in `demos/map/index.html`). |

## Exposed methods

| Public name | Internal method | Signature | Behavior |
|---|---|---|---|
| `address` | `superAddress` | `(address: string) => void` | Wired via `ncx.pass({ 'address': 'superAddress' })` in `NMapMarker.ts`'s `setup()`. Calling it (via a template ref, e.g. `markerRef.value.address('some street')`) calls `this.ncx('map').map.setMarkerByAddress(this.uid, address)`, and on success calls `this.ncx('map').map.superFocus()` (geocodes the address and recenters/focuses the parent map on it). |

`pass()`'s mapping is `{ [publicName]: 'internalMethodName' }` (see `src/root/js/proto/ProtoController.ts`), so the exposed public method name is **`address`**, not `setMarkerByAddress` — see Gotchas: `demos/map/index.html` calls `this.$refs.marker.setMarkerByAddress(...)`, which is stale against the current source.

## Minimal example

```vue
<template>
  <n-map :lat="53.55" :lng="9.99" :zoom="9">
    <n-map-marker :lat="53.55" :lng="9.99" />
  </n-map>
</template>
```

## Realistic example

Adapted from `demos/overview.html` (draggable marker, two-way-bound coordinates displayed in disabled inputs):

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

Adapted from `demos/map/index.html` (custom marker HTML content via default slot, plus the `address` exposed method — updated here to the current `address(...)` name rather than the demo's stale `setMarkerByAddress(...)` call, see Gotchas):

```vue
<template>
  <n-form-item :label="trans('Address')">
    <n-button-group>
      <n-input v-model="address" />
      <n-button @click="markerRef.address(address)">{{ trans('Set marker') }}</n-button>
    </n-button-group>
  </n-form-item>

  <n-form-item>
    <n-map>
      <n-map-marker ref="markerRef" v-model:lat="form.lat" v-model:lng="form.lng" :drag="true">
        <div style="padding: 20px; background: yellow; color: red;">Huhu!</div>
      </n-map-marker>
    </n-map>
  </n-form-item>
</template>

<script setup>
import { ref, reactive } from 'vue';
const form = reactive({ lat: 53.565, lng: 10.04228 });
const address = ref('');
const markerRef = ref(null);
</script>
```

## Required composition

`NMapMarker` cannot stand alone — it requires an `NMap` ancestor. Mechanically: `NMapController.setup()` calls `provide('NMap', this.instance)`; `NMapMarkerController.setup()` calls `this.injectRef(['map', 'NMap'])` (i.e. `this.refs['map'] = inject('NMap', null)`) and then immediately does `this.ncx('map').append((map) => this.initMarker(map))`. If there is no ancestor `NMap` providing `'NMap'`, `inject` resolves to `null`, `ncx('map')` returns `undefined`, and calling `.append(...)` on `undefined` throws a `TypeError` during `NMapMarker`'s own `setup()` — i.e. rendering `<n-map-marker>` outside `<n-map>` fails immediately, not silently.

## Common mistakes

- Calling `$refs.marker.setMarkerByAddress(...)`, as `demos/map/index.html` does: the current source exposes this as `address(...)`, not `setMarkerByAddress(...)` (see Exposed methods / Gotchas).
- Using `:draggable="true"` (as the stale `demos/map/index.html` shows) instead of the actual prop name `:drag="true"`.
- Expecting a combined `position` or `coordinates` object prop: there is no such prop — `lat` and `lng` are always separate `Number` props/v-models.
- Placing `<n-map-marker>` outside of `<n-map>` (e.g. rendering it conditionally in a sibling tree, or via `<teleport>`): this throws at setup time — see Required composition.
- Assuming `options` can override `lat`/`lng`/`draggable`: `initMarker()` spreads `data.options` first, then `{ lat, lng }`, then `draggable: data.drag` — the dedicated props always take precedence over the same keys inside `options`.

## Gotchas

- `demos/map/index.html` is stale relative to current source in three ways: it uses `:lat.sync`/`:draggable` (Vue-2-era API) instead of `v-model:lat`/`:drag`, and it calls the exposed method as `setMarkerByAddress(...)` instead of the current `address(...)` (from `pass({ 'address': 'superAddress' })`). Prefer `demos/overview.html` and the current source for the accurate contract.
- `update:lat`/`update:lng` only fire when `drag` is `true` and the user actually drags the pin (or something else moves the underlying Google Maps marker and fires `position_changed`) — setting `lat`/`lng` programmatically does not create an event loop, but also means a non-draggable marker (`drag: false`, the default) never emits position updates at all; it only ever reads `lat`/`lng` in one direction (prop → marker, via `importPosition()`/`watchProp`).
- The `position_changed` handler is debounced 500ms (`Run.debounce(..., 500)`), so `update:lat`/`update:lng` (and thus a bound `v-model`) lag behind the visual drag by up to half a second.
- The component's own root element is always `display: none` — `NMapMarkerView` never renders a visible marker itself; the actual pin/overlay is painted by the Google Maps API via `map.createMarker(...)`. If `context.slots.default` exists, that hidden div's `innerHTML` becomes the marker's custom HTML content at creation time only (`initMarker()` reads `this.el.innerHTML` once) — updating slot content later does not update an already-created marker's HTML. <!-- UNVERIFIED: no watcher on slot content was found in NMapMarkerController.ts, but this is a negative/absence finding rather than a directly-quoted confirmation. -->

## Related components

- `NMap` — required parent, see "Required composition" above and `ai-docs/components/map.md`.
