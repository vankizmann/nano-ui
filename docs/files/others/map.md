# Map

The `<n-map>` component provides a Google Maps integration for displaying interactive maps with markers and other features. It works together with the `<n-map-marker>` component to place location markers on the map.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    mapBinds: {
        zoom: 8,
        lat: 53.5511, 
        lng: 9.9937,
    },
    markerBinds: {
        drag: true,
        lat: 53.5511,
        lng: 9.9937,
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm" label="Latitude">
                <n-input v-model="markerBinds.lat" :disabled="true" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm" label="Longitude">
                <n-input v-model="markerBinds.lng" :disabled="true" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Map</h3>
            </div>
            <div class="col--1-1">
                <n-map v-bind="mapBinds">
                    <n-map-marker ref="marker" v-bind="markerBinds" v-model:lat="markerBinds.lat" v-model:lng="markerBinds.lng"></n-map-marker>
                </n-map>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Map

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `lat`           | `Number`       | `0`                 | Latitude coordinate for the center of the map.                                    |
| `lng`           | `Number`       | `0`                 | Longitude coordinate for the center of the map.                                   |
| `zoom`          | `Number`       | `15`                | Zoom level for the map (1-20).                                                    |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `getMap()`            | Returns the underlying map instance.                                 |
| `onMount(callback)`   | Registers a callback to be executed when the map is fully mounted.   |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content slot for map markers and other map elements.                 |

<hr>

## Map Marker

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `lat`           | `Number`       | `0`                 | Latitude coordinate for the marker position.                                      |
| `lng`           | `Number`       | `0`                 | Longitude coordinate for the marker position.                                     |
| `drag`          | `Boolean`      | `false`             | If true, the marker can be dragged to a new position.                             |
| `options`       | `Object`       | `{ style: 'default' }` | Options object for the marker (title, style, etc.).                              |

| **Method**                  | **Description**                                                    |
|-----------------------------|--------------------------------------------------------------------|
| `setMarkerByAddress(address)` | Sets the marker position by geocoding an address string.           |

| **Event**                   | **Description**                                                      |
|-----------------------------|----------------------------------------------------------------------|
| `update:lat`                | Emitted when the marker's latitude changes.                          |
| `update:lng`                | Emitted when the marker's longitude changes.                         |
| `dragstart`                 | Emitted when the user starts dragging the marker.                    |
| `dragend`                   | Emitted when the user stops dragging the marker.                     |
| `mouseenter`                | Emitted when the mouse enters the marker.                            |
| `mouseleave`                | Emitted when the mouse leaves the marker.                            |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for custom HTML marker.                                      |